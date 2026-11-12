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
| Layouts, one file per group | `src/deck/layouts/*.tsx` |
| Registry (gallery order) | `src/deck/registry.ts` |
| Decks (content only) | `decks/<slug>.ts` |
| Gallery: every layout light + dark | `/vorlagen`, single: `/vorlagen/<id>?thema=dark` |
| One deck | `/deck/<slug>` |
| Screenshots + overflow/limit check | `node scripts/shot.mjs --ids a,b --out output/shots` |
| Deck check (limits, unknown layouts) | `npx tsx scripts/check-deck.ts <slug>` |
| PDF | `node scripts/export-pdf.mjs --route /deck/<slug> --output <file>.pdf` |
| Template references (gitignored, third-party) | `referenz/akoya/`, `referenz/portfolio/` |

## Design rules (why: same look as uhl-website, readable on a projector)

- Canvas fixed 1920 x 1080 px. Margin `--rand` 96, chrome 56 from the edge, content between `--oben` 168 and `--unten` 152.
- Fonts from uhl-website: **Funnel Display** for voice (display, aussage, titel, zahl, karte, zitat), **Funnel Sans** for running text (lead, body, meta).
- Type only via `<T stil=…>` / `t-*` classes; strong weight in running text via `t-stark`. Never a raw font size, colour or radius in a layout. Smallest text 18 px (`meta`).
- Line length is capped by `max-width` in `em` on each style: display ~18 chars/line, aussage ~30, titel ~36, lead ~46, body ~62. Headlines `text-wrap: balance`, running text `pretty`. Line height: headings 0.98–1.15, lead 1.4, body 1.5.
- **Character limits** live per field in each `LayoutDef.limits`; `<T max>` outlines overflow in red on screen. A deck must pass `check-deck` before PDF export.
- Radius never above 8 px (`--r`), tags 4 px. No pills, no circles, except portraits of people (`Bild portrait`) and chart shapes.
- **Colour only via theme roles** (`deck.css` top: `--flaeche`, `--hoch`, `--hoch-2`, `--text`, `--text-2`, `--linie`, `--akzent`, `--akzent-text`, `--akzent-text-2`, `--balken`, `--spur`, `--spur-fertig`, `--logo`). Every slide renders in light AND dark from the same markup; never force a theme in a layout. Contrast of every role pair is checked (webdesign-rules, AA). Why: user F1 "light version vordefinierte farbcodes … und selbe für schwarz".
- **Cards are grey** (`--hoch`: salbei on light, tanne on dark), never black on white. **Two-tone**: things on a card use `--hoch-2`, one step darker on light (halm) and one step lighter on dark (farn); on a lime card the desaturated light green; a value badge on a bar is one step darker than the bar (`--balken-schild`). Why: user F2 "immer Two-Tone arbeiten". Lime `--akzent` is the one signal per slide (`==wort==`, the key number, the key bar). Why: user F1 "auf weiß nur graue cards keine schwarzen".
- **No outlines**: no borders on cards, tags, markers, pictures, chart shapes; no glass. Hairlines only as row separators in real tables/lists. Why: user F1 "keine outlines", "weniger trennlinien", "glaseffekt ganz weg".
- **No footer, no page number** (F2 "Fußzeile entfernen … Seitenanzahl irrelevant"); the chapter label top left stays. Row hairlines never above the first or below the last row. Every slide has the same ground; an empty full-bleed picture shows the ground.
- Logo: the uhl block mark without a box, black on light, white on dark (`--logo`), top right. Why: user F1.
- **Icons only from `lucide-react`**, never ASCII/Unicode characters (→ ↑ ↗ ✓ •) as icons. Why: user F2b/F2c "richtige Icons, keine ASCII-Zeichen".
- Bullets only via `<Liste>`: check mark on a small grey tile (website style). Why: user F1 "custom stichpunkt … mit icon, allgemein global".
- Text | media / text | statement splits are always **50/50**. A single statement on a picture sits in the vertical middle. Why: user F1b "immer 50/50 das es clean aussieht".
- **Less content**: one headline + one supporting block; no second paragraph without a reason. Why: user F1 "doppelabsätze ohne grund weg", "zu überladen".
- Spacing tokens: headline to content `--s3` 48, inside a text block `--s2` 24, title to text / picture to caption `--s1` 12, text column to media column `--s4` 96, cards and pictures in a grid `--gap` 32. Content stays in `.inhalt` unless full-bleed.
- Spacing doubles: 12 / 24 / 48 / 96 (`--s1`…`--s4`), grid gap 32.
- Lots of air: one idea per slide, at most one headline + one supporting block.

## Commit

Private safety level: commit per finished unit, push to `main` (memory: the October deck code was lost because it was never pushed).
