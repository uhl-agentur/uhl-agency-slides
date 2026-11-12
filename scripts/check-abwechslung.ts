// Selfcheck of the variation rules (src/deck/abwechslung.ts) and the picture slot rule
// (typen.ts bilderNoetig / echteBilder, enforced by check-deck) with deliberately bad decks.
// usage: npm run check:abwechslung
import assert from 'node:assert';
import { pruefeAbwechslung } from '../src/deck/abwechslung';
import { layoutNach } from '../src/deck/registry';
import { bilderNoetig, echteBilder, type Deck, type FolieImDeck } from '../src/deck/typen';

const folie = (layout: string, variante?: string): FolieImDeck => ({ layout, variante, props: {} });
const deck = (slug: string, folien: FolieImDeck[], art: Deck['art'] = 'pitch'): Deck => ({ slug, titel: slug, thema: 'light', art, folien });
const regeln = (w: string[]) => w.map((x) => x.match(/Regel (\d)/)?.[1]).sort().join('');

// clean deck: no warning
const gut = deck('gut', [folie('titel', 'links'), folie('inhalt', 'zeilen'), folie('aussage-bild', 'vollbild'), folie('kennzahlen', 'drei'), folie('text', 'liste'), folie('kontakt', 'abschluss')]);
assert.deepEqual(pruefeAbwechslung(gut), []);

// rule 1: same variant twice in a row (also counts as the family twice: not yet rule 2)
assert.equal(regeln(pruefeAbwechslung(deck('r1', [folie('kennzahlen', 'drei'), folie('kennzahlen', 'drei')]))), '1');
// rule 2: one family three times in a row, different variants
assert.equal(regeln(pruefeAbwechslung(deck('r2', [folie('kennzahlen', 'drei'), folie('kennzahlen', 'sechs'), folie('kennzahlen', 'bild')]))), '2');
// kapitel and single-variant families are exempt from 2 and 3
assert.deepEqual(pruefeAbwechslung(deck('frei', [folie('kapitel', 'trenner'), folie('text', 'liste'), folie('kapitel', 'trenner'), folie('kennzahlen', 'drei'), folie('kapitel', 'trenner'), folie('strategie-swot'), folie('strategie-swot'), folie('strategie-swot')])), []);
// rule 3: a variant three times in one deck
assert.equal(regeln(pruefeAbwechslung(deck('r3', [folie('kennzahlen', 'drei'), folie('titel', 'links'), folie('kennzahlen', 'drei'), folie('galerie', 'reihe'), folie('kennzahlen', 'drei')]))), '3');
// rule 4: four text slides in a row (titel/links, text/*, kontakt/mail are text)
assert.equal(regeln(pruefeAbwechslung(deck('r4', [folie('titel', 'links'), folie('text', 'einleitung'), folie('text', 'zentriert'), folie('kontakt', 'mail')]))), '4');
// rule 5: newest other deck of the same kind uses the same variants; another kind is ignored
const alt = deck('alt', [folie('titel', 'links'), folie('kennzahlen', 'drei'), folie('kontakt', 'abschluss')]);
const neu = deck('neu', [folie('titel', 'links'), folie('kennzahlen', 'drei'), folie('kontakt', 'bild')]);
const w5 = pruefeAbwechslung(neu, [alt, neu]);
assert.equal(regeln(w5), '5');
assert.match(w5[0], /titel: statt links z\. B\. bild-haelfte/);
assert.deepEqual(pruefeAbwechslung(neu, [{ ...alt, art: 'strategie' }, neu]), []);
// no variante = the family's first variant
assert.equal(regeln(pruefeAbwechslung(deck('default', [folie('kennzahlen'), folie('kennzahlen', 'drei')]))), '1');

// picture slots: fixed and prop-dependent counts, src at any depth, empty src does not count
const v = (f: string, x?: string) => layoutNach(f, x)!;
assert.equal(bilderNoetig(v('galerie', 'raster6'), {}), 6);
assert.equal(bilderNoetig(v('team'), { mitglieder: [{}, {}, {}] }), 3);
assert.equal(bilderNoetig(v('aussage-bild', 'rahmen'), { bilder: [{ src: 'a' }] }), 1);
assert.equal(bilderNoetig(v('titel', 'links'), {}), 0);
assert.equal(echteBilder({ bild: { src: 'a.jpg' }, schritte: [{ bild: { src: 'b.jpg' } }, { bild: { src: ' ' } }, {}] }), 2);
assert.equal(echteBilder({ bilder: [{}, { text: 'Startseite' }] }), 0);

console.log('check-abwechslung: ok');
