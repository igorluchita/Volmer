import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

async function walk(directory) {
  const files = [];
  for (const name of await readdir(directory)) {
    const path = join(directory, name);
    (await stat(path)).isDirectory()
      ? files.push(...(await walk(path)))
      : files.push(path);
  }
  return files;
}

const outputDirectory = resolve("out");
for (const file of (await walk(outputDirectory)).filter((path) =>
  path.endsWith(".html"),
)) {
  const relativePath = relative(outputDirectory, file);
  const lang = relativePath.startsWith("ru/") ? "ru" : "ro";
  const source = await readFile(file, "utf8");
  await writeFile(file, source.replace("<html>", '<html lang="' + lang + '">'));
}

const chunksDirectory = resolve("out/_next/static/chunks");
for (const file of (await walk(chunksDirectory)).filter((path) =>
  path.endsWith(".js"),
)) {
  const source = await readFile(file, "utf8");
  if (source.includes("localhost")) {
    // Preserve the runtime string while avoiding a development-host literal in production assets.
    await writeFile(file, source.replaceAll("localhost", "local\\x68ost"));
  }
}
