// Check a deck before export: every layout exists, every text within its character limit,
// array counts within range. Exit 1 on any finding.
// usage: npx tsx --tsconfig scripts/tsconfig.check.json scripts/check-deck.ts <slug|--alle|--vorlagen>
import { decks, deckNach } from '../decks';
import { layoutNach, layouts } from '../src/deck/registry';
import { pruefeLimits } from '../src/deck/typen';

const ziel = process.argv[2];
if (!ziel) {
  console.error('usage: check-deck.ts <slug> | --alle | --vorlagen');
  process.exit(2);
}
const funde: string[] = [];

if (ziel === '--vorlagen') {
  const ids = new Set<string>();
  for (const l of layouts) {
    if (ids.has(l.id)) funde.push(`doppelte id ${l.id}`);
    ids.add(l.id);
    for (const f of pruefeLimits(l.beispiel, l)) funde.push(`${l.id} (beispiel): ${f}`);
    if (!Object.keys(l.limits).length) funde.push(`${l.id}: keine limits`);
  }
  console.log(`${layouts.length} Layouts geprüft`);
} else {
  const liste = ziel === '--alle' ? decks : [deckNach(ziel)].filter((d) => d !== undefined);
  if (!liste.length) {
    console.error(`Deck ${ziel} nicht gefunden (registriert in decks/index.ts?)`);
    process.exit(2);
  }
  for (const d of liste) {
    d.folien.forEach((f, i) => {
      const ort = `${d.slug} Folie ${i + 1} (${f.layout})`;
      const l = layoutNach(f.layout);
      if (!l) return funde.push(`${ort}: unbekanntes Layout`);
      for (const x of pruefeLimits(f.props, l)) funde.push(`${ort}: ${x}`);
      // a typo in a field name renders an empty slide; fields the sample and the limits never
      // name are probably typos (warning only: optional fields like bild may be missing from both)
      const bekannt = new Set([...Object.keys(l.beispiel), ...Object.keys(l.limits).map((k) => k.split(/[.[]/)[0]), ...Object.keys(l.anzahl ?? {})]);
      for (const k of Object.keys(f.props)) if (!bekannt.has(k)) console.log(`  ? ${ort}: Feld "${k}" kennt das Layout vermutlich nicht (Tippfehler?)`);
      if (JSON.stringify(f.props).includes('FEHLT:')) funde.push(`${ort}: enthält noch FEHLT-Marker`);
    });
    console.log(`${d.slug}: ${d.folien.length} Folien geprüft`);
  }
}
for (const f of funde) console.log(`  ✗ ${f}`);
process.exit(funde.length ? 1 : 0);
