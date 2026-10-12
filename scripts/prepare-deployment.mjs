import {cp, lstat, mkdir, readdir, realpath, rename, rm, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const standaloneRoot = path.join(projectRoot, '.next', 'standalone');
const publicRoot = path.join(projectRoot, 'public');
const staticRoot = path.join(projectRoot, '.next', 'static');
const deploymentRoot = path.join(projectRoot, 'deployment');
const packageRoot = path.join(deploymentRoot, 'volmer-app');
const stageRoot = path.join(deploymentRoot, `.volmer-app-stage-${process.pid}`);
const forbiddenNames = /^(?:\.env(?:\..*)?|\.git|service-account(?:[-_].*)?\.json|google-(?:service-account|credentials).*\.json|credentials\.json)$/i;
const forbiddenExtensions = new Set(['.pem', '.p12', '.pfx', '.key']);

async function exists(target) {
  try { await stat(target); return true; } catch { return false; }
}

async function assertExists(target, description) {
  if (!await exists(target)) throw new Error(`${description} is missing. Run npm run build first.`);
}

async function verifyTree(current, boundary) {
  for (const entry of await readdir(current, {withFileTypes: true})) {
    const target = path.join(current, entry.name);
    const info = await lstat(target);
    if (forbiddenNames.test(entry.name) || forbiddenExtensions.has(path.extname(entry.name).toLowerCase())) {
      throw new Error('Deployment output contains a forbidden environment/credential artifact. Package was not published.');
    }
    if (info.isSymbolicLink()) {
      const resolved = await realpath(target);
      if (!resolved.startsWith(boundary + path.sep)) throw new Error('Deployment output contains a symlink outside the package.');
    } else if (entry.isDirectory()) {
      await verifyTree(target, boundary);
    }
  }
}

async function copyDirectoryContents(from, to) {
  await mkdir(to, {recursive: true});
  for (const name of await readdir(from)) {
    if (name === '.htaccess') continue;
    await cp(path.join(from, name), path.join(to, name), {recursive: true, force: true, dereference: false});
  }
}

async function countFiles(current) {
  let count = 0;
  for (const entry of await readdir(current, {withFileTypes: true})) {
    count += entry.isDirectory() ? await countFiles(path.join(current, entry.name)) : 1;
  }
  return count;
}

await assertExists(path.join(standaloneRoot, 'server.js'), '.next/standalone/server.js');
await assertExists(path.join(standaloneRoot, 'package.json'), '.next/standalone/package.json');
await assertExists(path.join(standaloneRoot, 'node_modules'), '.next/standalone/node_modules');
await assertExists(path.join(standaloneRoot, '.next', 'server'), '.next/standalone/.next/server');
await assertExists(publicRoot, 'public/');
await assertExists(staticRoot, '.next/static/');

if (await exists(packageRoot)) throw new Error('deployment/volmer-app already exists. Move it aside before preparing a new package.');
if (await exists(stageRoot)) throw new Error('A staging directory for this process already exists; inspect it before retrying.');

try {
  await mkdir(deploymentRoot, {recursive: true});
  await cp(standaloneRoot, stageRoot, {recursive: true, errorOnExist: true, force: false, dereference: false});
  await copyDirectoryContents(publicRoot, path.join(stageRoot, 'public'));
  await copyDirectoryContents(staticRoot, path.join(stageRoot, '.next', 'static'));
  await verifyTree(stageRoot, stageRoot);

  const requiredAssets = [
    'public/favicon.png',
    'public/images/brand/volmer-logo.jpg',
    'public/images/homepage/hero.webp',
    'public/images/hearing-aids/catalog/moxi-smile.jpg',
    'public/images/homepage/volmer-office-facade-current.png',
  ];
  for (const asset of requiredAssets) await assertExists(path.join(stageRoot, asset), asset);
  if (await countFiles(path.join(stageRoot, '.next', 'static')) === 0) throw new Error('The package has no .next/static assets.');

  await rename(stageRoot, packageRoot);
  console.log(`Standalone deployment package prepared: ${path.relative(projectRoot, packageRoot)}`);
  console.log(`Top-level files: ${(await readdir(packageRoot)).sort().join(', ')}`);
  console.log(`Static asset files: ${await countFiles(path.join(packageRoot, '.next', 'static'))}`);
  console.log('Sensitive-file scan: passed.');
} catch (error) {
  if (await exists(stageRoot)) await rm(stageRoot, {recursive: true, force: true});
  throw error;
}
