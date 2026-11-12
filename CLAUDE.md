# uhl-agency-slides

Next.js app for the agency's presentations. Two generations live here:

- **Uhl deck system (current)** — `src/deck/`, routes in `app/(uhl)/`. Every new deck uses it.
- Older decks (Gesprächsgrundlage look, Carlito): `src/slides/`, `app/donauries-social`, `app/kickoff`. Keep them working, do not extend them.

## Deck system: where things live

| Thing | Path |
|---|---|
| Tokens, type scale, chrome, tiles (one truth for every visual value) | `src/deck/deck.css` |
| Primitives `Folie`, `T`, `Liste`, `Bild`, `Kennzahl`, `UhlZeichen`, `FolienRahmen` | `src/deck/system.tsx` |
| Charts (bars, lines, venn, timeline, scale, matrix) | `src/deck/charts.tsx` |
| Layout contract `LayoutDef`, deck format `Deck`, `pruefeLimits` | `src/deck/typen.ts` |
| Layout families (S5): `registry.familien` = order + names; variants live in `src/deck/layouts/*.tsx` | `src/deck/registry.ts` |
| Registry (gallery order) | `src/deck/registry.ts` |
| Decks (content only) | `decks/<slug>.ts` |
| Gallery: every family with its variants, light + dark | `/vorlagen`, single: `/vorlagen/<familie>/<variante>?thema=dark` |
| One deck | `/deck/<slug>` |
| Screenshots + overflow/limit check | `node scripts/shot.mjs --ids a,b --out output/shots` |
| Deck check (limits, unknown family/variant, empty picture slots) | `npm run check:deck -- <slug>` |
| Smoke test: every layout with stress content (max/min), overflow, overlap, widows, card insets | `npm run smoke` (dev server on 3417); stress data `src/deck/probe.ts`, `/vorlagen/<familie>/<variante>?probe=max` |
| Typesetting selfcheck (`satz()` in `src/deck/cx.ts`) | `npm run check:satz` |
| PDF | `node scripts/export-pdf.mjs --route /deck/<slug> --output <file>.pdf` |

## Design rules (why: same look as uhl-website, readable on a projector)

- Canvas fixed 1920 x 1080 px. **One frame of 72 on all four sides**: label and logo (56 px) 72 from the top (`--chrome`), sides `--rand` 72, content ends `--unten` 72 above the bottom; content starts at `--oben` 176 below the chrome row. Why: user F3e "symetrisches rand padding", F3f "weniger layout padding", "logo etwas größer".
- Fonts from uhl-website: **Funnel Display** for voice (display, aussage, titel, zahl, karte), **Funnel Sans** for running text (lead, body, meta). **One scale, one weight** (F3g "fonts mergen und reduzieren"): Display always 550 at 136 · 72 · 56 · 32 (zahl = 136, zahl-s = 72, quote = aussage), Sans 32 · 24 · 18. Inventory of what slides really use: `/typo`. Headlines (display, aussage, titel, karte) write "und" as "&" automatically in `<T>` (F3g).
- Type only via `<T stil=…>` / `t-*` classes; strong weight in running text via `t-stark`. Never a raw font size, colour or radius in a layout. Smallest text 18 px (`meta`).
- Line length is capped by `max-width` in `em` on each style: display ~18 chars/line, aussage ~30, titel ~36, lead ~46, body ~62. Headlines `text-wrap: balance`, running text `pretty`. Line height: headings 0.98–1.15, lead 1.4, body 1.5.
- **Families with variants** (F4): a family is one message, its variants are compositions of it. Deck slides name `{ layout: '<familie>', variante }`. Variants that differ by a parameter share one component (side, grid, count); really different compositions stay separate functions. Every variant declares `art` (text/bild/zahl/diagramm/liste) and `bilder` (picture slots). Why: user F4 "in einer Slide mit mehreren Varianten darstellen", "Code zusammenlegen".
- **No empty picture slots in a deck**: `check-deck` fails when a slide has fewer real pictures (`src`) than its variant's `bilder`; without pictures pick a variant of the same family that needs none. Why: user F4 "nicht setzt für die Slots".
- **Character limits** live per field in each `LayoutDef.limits`; `<T max>` outlines overflow in red on screen. A deck must pass `check-deck` before PDF export.
- Radius never above 8 px (`--r`), tags 4 px. No pills, no circles, except portraits of people (`Bild portrait`) and chart shapes.
- **Colour only via theme roles** (`deck.css` top: `--flaeche`, `--hoch`, `--hoch-2`, `--text`, `--text-2`, `--linie`, `--akzent`, `--akzent-text`, `--akzent-text-2`, `--balken`, `--spur`, `--spur-fertig`, `--logo`). Every slide renders in light AND dark from the same markup; never force a theme in a layout. Contrast of every role pair is checked (webdesign-rules, AA). Why: user F1 "light version vordefinierte farbcodes … und selbe für schwarz".
- **Cards are grey** (`--hoch`: salbei on light, tanne on dark), never black on white. **Two-tone, one step further from the ground inward** (ground → card → box/badge): light goes darker (papier → salbei → halm), dark goes lighter (wald → tanne → farn), a lime card gets a darker green box; values on a bar are plain text in its top corner, no badge (F2g: too many tone-on-tone layers). Why: user F2/F2e/F2f "bei hell dunkler werden und bei dunkel heller". Lime `--akzent` is the one signal per slide (`==wort==`, the key number, the key bar). Why: user F1 "auf weiß nur graue cards keine schwarzen".
- **No outlines**: no borders on cards, tags, markers, pictures, chart shapes; no glass. Hairlines only as row separators in real tables/lists. One exception: the hatched "Baustelle" traffic-light mark keeps an outline (F2d). Why: user F1 "keine outlines", "weniger trennlinien", "glaseffekt ganz weg".
- **No footer, no page number** (F2 "Fußzeile entfernen … Seitenanzahl irrelevant"); the chapter label top left stays. Row hairlines never above the first or below the last row. Every slide has the same ground; an empty full-bleed picture shows the ground.
- Logo: the uhl block mark without a box, black on light, white on dark (`--logo`), top right. Why: user F1.
- **Icons only from `lucide-react`**, never ASCII/Unicode characters (→ ↑ ↗ ✓ •) as icons. Why: user F2b/F2c "richtige Icons, keine ASCII-Zeichen".
- Bullets only via `<Liste>`: check mark on a small grey tile (website style). Why: user F1 "custom stichpunkt … mit icon, allgemein global".
- Text | media / text | statement splits are always **50/50**. A single statement on a picture sits in the vertical middle. Why: user F1b "immer 50/50 das es clean aussieht".
- **Less content**: one headline + one supporting block; no second paragraph without a reason. Why: user F1 "doppelabsätze ohne grund weg", "zu überladen".
- Spacing tokens: headline to content `--s3` 48, inside a text block `--s2` 24, title to text / picture to caption `--s1` 12, text column to media column `--s4` 96, cards and pictures in a grid `--gap` 32. Content stays in `.inhalt` unless full-bleed.
- Spacing doubles: 12 / 24 / 48 / 96 (`--s1`…`--s4`), grid gap 32.
- **Even card insets**: a card has one padding on all four sides (`--s3`, small cards `--s2`); its first text line is trimmed to cap height and its last to the baseline (`text-box` in deck.css), so the visible inset equals the padding. Chart panels too. Why: user F3 "padding in cards sollte auch einheitlich sein".
- **Bars**: `--balken` is the box level on a chart panel: light halm #C4C4C4 with dark value, dark moos with light value. Why: user F3 "c4c4c4", "dunkler hintergrund wird hell auf heller".
- **Vertical centring**: split columns, table rows and title + block stacks centre their content vertically (`alignItems` / `justifyContent: center`), no baseline rows, no title-top/source-bottom columns. Stats in a row sit at one fixed gap (content-sized, not equal columns). Why: user F3b/F3c/F3d.
- **Numbers only for a real order** (process, timeline, agenda, chapter): a set of services or focus areas gets no 01/02 eyebrow; layouts keep it as opt-in `nummeriert`. Why: user F3i "das ist ja keine Reihenfolge".
- **No filler meta** like "Augsburg · 2026": every line on a slide says something. Why: user F3b "sowas weg, nix aussagen".
- **Typesetting** (F3 "Hurenkind und Schusterjunge und weiteres"): slides have no page or column breaks inside a text, so the print widow/orphan cannot occur; the slide equivalents are handled: `satz()` binds number + unit, abbreviations, dashes and the last two words (no single-word last line); running text hyphenates only words of 10+ letters (`hyphenate-limit-chars`), headlines never; a too-long word breaks instead of overflowing. `npm run smoke` proves it on stress content.
- Lots of air: one idea per slide, at most one headline + one supporting block.

## Commit

Private safety level: commit per finished unit, push to `main` (memory: the October deck code was lost because it was never pushed).
