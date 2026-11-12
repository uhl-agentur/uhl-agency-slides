// Check a deck before export: every family and variant exists, every text within its character
// limit, array counts within range, every picture slot filled with a real picture (F4: grey
// placeholder frames never ship). Exit 1 on any finding. Variation warnings (! lines,
// src/deck/abwechslung.ts) and unknown fields (? lines) never fail the check.
// usage: npx tsx --tsconfig scripts/tsconfig.check.json scripts/check-deck.ts <slug|--alle|--vorlagen>
import { decks, deckNach } from '../decks';
import { familien, layoutNach, layouts, varianten } from '../src/deck/registry';
import { pruefeAbwechslung } from '../src/deck/abwechslung';
import { bilderNoetig, echteBilder, pfadVon, pruefeLimits } from '../src/deck/typen';

const ziel = process.argv[2];
if (!ziel) {
  console.error('usage: check-deck.ts <slug> | --alle | --vorlagen');
  process.exit(2);
}
const funde: string[] = [];

if (ziel === '--vorlagen') {
  const ids = new Set<string>();
  for (const l of layouts) {
    const id = pfadVon(l);
    if (ids.has(id)) funde.push(`doppelte Variante ${id}`);
    ids.add(id);
    if (!familien.some((f) => f.id === l.familie)) funde.push(`${id}: Familie fehlt in registry.familien`);
    if (!l.variante && layouts.filter((x) => x.familie === l.familie).length > 1) funde.push(`${id}: Familie mit mehreren Varianten braucht variante`);
    for (const f of pruefeLimits(l.beispiel, l)) funde.push(`${id} (beispiel): ${f}`);
    if (!Object.keys(l.limits).length) funde.push(`${id}: keine limits`);
  }
  console.log(`${familien.length} Familien, ${layouts.length} Varianten geprüft`);
} else {
  const liste = ziel === '--alle' ? decks : [deckNach(ziel)].filter((d) => d !== undefined);
  if (!liste.length) {
    console.error(`Deck ${ziel} nicht gefunden (registriert in decks/index.ts?)`);
    process.exit(2);
  }
  for (const d of liste) {
    d.folien.forEach((f, i) => {
      const ort = `${d.slug} Folie ${i + 1} (${f.layout}${f.variante ? `/${f.variante}` : ''})`;
      const l = layoutNach(f.layout, f.variante);
      if (!l) {
        const v = varianten(f.layout).map((x) => x.variante);
        return funde.push(`${ort}: ${v.length ? `unbekannte Variante, erlaubt: ${v.join(', ')}` : 'unbekannte Familie'}`);
      }
      for (const x of pruefeLimits(f.props, l)) funde.push(`${ort}: ${x}`);
      // F4: a variant whose picture slots stay empty never ships; pick a text or zahl variant instead
      const noetig = bilderNoetig(l, f.props);
      const da = echteBilder(f.props);
      if (da < noetig) {
        const ohne = varianten(l.familie).filter((x) => bilderNoetig(x, f.props) === 0).map((x) => x.variante);
        funde.push(`${ort}: ${noetig} ${noetig === 1 ? 'Bild' : 'Bilder'} nötig, ${da} echte (src)${ohne.length ? `; ohne Bilder: ${ohne.join(', ')}` : ''}`);
      }
      // a typo in a field name renders an empty slide; fields the sample and the limits never
      // name are probably typos (warning only: optional fields like bild may be missing from both)
      const bekannt = new Set([...Object.keys(l.beispiel), ...Object.keys(l.limits).map((k) => k.split(/[.[]/)[0]), ...Object.keys(l.anzahl ?? {})]);
      for (const k of Object.keys(f.props)) if (!bekannt.has(k)) console.log(`  ? ${ort}: Feld "${k}" kennt das Layout vermutlich nicht (Tippfehler?)`);
      if (JSON.stringify(f.props).includes('FEHLT:')) funde.push(`${ort}: enthält noch FEHLT-Marker`);
    });
    // variation rules (F4): warnings only, they never block the export
    for (const w of pruefeAbwechslung(d, decks)) console.log(`  ! ${d.slug}: ${w}`);
    console.log(`${d.slug}: ${d.folien.length} Folien geprüft`);
  }
}
for (const f of funde) console.log(`  ✗ ${f}`);
process.exit(funde.length ? 1 : 0);
