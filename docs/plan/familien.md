# S5 Families: merge similar layouts, vary decks

User F4 (2026-11-12, verbatim in docs/feedback.md): merge near-identical slides into one slide with
variants, merge the code too, ponytail audit first; the /slides skill must vary layouts across
pitches; repetition rules checked by a script (warnings only); never pick a layout whose slots
cannot be filled.

## Ponytail audit (before the refactor)

- The user sees *families*; the code only needs one component per family where variants differ by a
  parameter (side, count, optional block). Variants with a really different composition stay
  separate functions inside the family file, behind one `variante` switch. No variant framework.
- Kill: per-variant duplicate interfaces, `beispiel` and `limits` (one per family, a variant may
  override), duplicate helpers (`nr`, `mitte` in two files), `strategie-balken` horizontal bars vs
  `Balken` (one chart, `richtung`).
- Deck format: `{ layout: '<familie>', variante?: '<key>', props }`; no `variante` = first variant.
  Old ids are dropped (only `decks/beispiel.ts` uses them; it is migrated).
- Layout ids stay kebab-case German. Families get a `art` per variant: `text | bild | zahl |
  diagramm | liste` (drives the rhythm rule) and `bilder: n` = picture slots the variant needs.

## Family map (77 layouts -> 30 families)

| Family | Variants (old id) |
|---|---|
| `titel` | links (titel-links) · bild-haelfte (titel-split) · vollbild (titel-bild) · streu (hero-streu) · portrait (hero-portrait) |
| `inhalt` | bild (inhalt-split) · gross (inhalt-zentriert) · zeilen (inhalt-zeilen) |
| `kapitel` | trenner (kapitel-trenner) · bilder (kapitel-bild) · projekt (projekt-titel) |
| `text` | einleitung (einstieg-text) · liste (problem-text) · loesung (loesung-text) · zentriert (ansatz) · zwei-spalten (wert-zwei-spalten) |
| `aussage-bild` | vollbild (einstieg-bild + problem-bild) · rahmen (rahmen-bild) · hochkant (einstieg-bild-hoch) · bild-links (einstieg-bild-satz) · bild-rechts (einstieg-satz-bild) |
| `aussage-bilder` | mosaik (problem-mosaik) · raster (problem-raster) · saetze (problem-aussage) · zwischen (loesung-mitte + zitat-bilder) · verstreut (loesung-verstreut) · zickzack (loesung-zickzack) |
| `text-bilder` | bilder-text (loesung-bilder-text) · mosaik (wert-mosaik) · leistung (leistung-mosaik) · projekt (arbeiten-projekt) · lieferumfang (lieferumfang) |
| `galerie` | bento8 · bento53 · raster6 · mauerwerk · reihe (arbeiten-reihe) |
| `leistungen` | karten (leistung-karten4) · spalten (leistungen-spalten) · treppe (leistungen-treppe) |
| `ablauf` | schritte (prozess-schritte) · zeitleiste · titel-zeitleiste · zeitleiste-aussage |
| `kennzahlen` | drei · drei-bild · sechs · text-sechs |
| `preise` | balken (preis-balken) · spalten (preise-spalten) · pakete (pitch-pakete) |
| `beweis` | stimme (testimonial) · logos (kunden-logos) · jahre (liste-jahre) · case (pitch-case) |
| `kontakt` | mail · abschluss · bild · spalten |
| `diagramm` | balken (strategie-balken) · linie (strategie-linie) · venn (wert-venn) · matrix (strategie-matrix) |
| singletons | team, strategie-kernsatz, -marktbild, -swot, -wettbewerb, -personas, -journey, -unternehmen, -kanalmix, -kpi, -roadmap, offene-fragen |

Exact grouping may shift while merging when two variants turn out to need different props; the
rule is "same message, different composition = variant".

## Variation rules (`scripts/check-abwechslung.ts`, warnings only, `npm run check:deck` prints them)

1. Same family + variant never twice in a row.
2. Same family at most twice in a row (kapitel and the strategy singletons excepted).
3. Same variant at most twice per deck.
4. At most three slides of `art: text` in a row; alternate with bild / zahl / diagramm.
5. Across decks: compare with the newest other deck of the same kind (pitch vs strategy); if more
   than half of the shared families use the same variant, warn and name alternatives.
6. HARD (error, blocks export): a variant with `bilder: n` needs n real pictures in props; empty
   grey slots never ship. No pictures -> pick a text / zahl variant of the same family.

## Skill (/slides) changes

- Tables A/B map each source section to a *family* plus 2-3 allowed variants, not to one id.
- Choice procedure: read the newest decks in `decks/`, pick the variant used least recently, check
  slots (pictures available?), then run `check:deck` and fix every warning it can.

## Steps

1. Families + variant switch per group file, registry, typen (`variante`, `art`, `bilder`), gallery
   per family, `/vorlagen/<familie>?variante=`. Migrate `decks/beispiel.ts`.
2. Checks: `check-abwechslung` + slot rule in `check-deck`; selfcheck with a bad sample deck.
3. Skill + CLAUDE.md. Smoke (all variants, light/dark, max/min) = 0, tsc, lint. Commit per step.
