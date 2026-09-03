const articlePairs = [
  ["semne-auz-slab", "priznaki-snizheniya-sluha"],
  ["aud-vocea-nu-inteleg-cuvintele", "slyshu-golos-ne-razbirayu-slova"],
  ["vorbirea-in-zgomot", "rech-v-shume"],
  ["cand-faci-test-auditiv", "kogda-proveryat-sluh"],
  ["cum-se-desfasoara-test-auditiv", "kak-prohodit-proverka-sluha"],
  ["cum-alegi-aparat-auditiv", "kak-vybrat-sluhovoy-apparat"],
  ["ric-bte-intraauricular", "ric-bte-vnutriushnye"],
  ["aparate-reincarcabile-avantaje", "perezaryazhaemye-apparaty"],
  ["bluetooth-aparate-auditive", "bluetooth-v-sluhovyh-apparatah"],
  ["intretinere-aparat-auditiv", "uhod-za-apparatom"],
  ["importanta-reglajului", "vazhnost-nastroyki"],
  ["ajutor-persoana-auz-slab", "pomoshch-blizkomu-so-sluhom"],
] as const;

export function localizedBlogPath(path: string, from: "ro" | "ru") {
  const match = path.match(/^\/blog\/([^/]+)\/?$/);
  if (!match) return path;
  const index = from === "ro" ? 0 : 1;
  const pair = articlePairs.find((item) => item[index] === match[1]);
  return pair ? `/blog/${pair[index === 0 ? 1 : 0]}` : "/blog";
}
