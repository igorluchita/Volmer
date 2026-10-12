import {editorialPath, editorialTypeFor} from './editorial-routing';
import {legalPath, legalTypes} from './legal-pages';

export function localizedBlogPath(path: string, from: "ro" | "ru") {
  const slug = path.match(/^\/([^/]+)\/?$/)?.[1];
  if (slug) {
    const editorial = editorialTypeFor(from, slug);
    if (editorial) return editorialPath(from === 'ro' ? 'ru' : 'ro', editorial).replace(/^\/(ro|ru)/, '').replace(/\/$/, '');
    const legal = legalTypes.find((type) => legalPath(from, type).split('/')[2] === slug);
    if (legal) return legalPath(from === 'ro' ? 'ru' : 'ro', legal).replace(/^\/(ro|ru)/, '').replace(/\/$/, '');
  }
  return path;
}
