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
- Radius never above 8 px (`--r`), tags 4 px. No pills, no circles, except portraits of people (`Bild portrait`).
- Colours only via roles (`--flaeche`, `--hoch`, `--text`, `--text-2`, `--linie`, `--akzent`). Lime `--akzent` is the one signal per slide: a highlight (`==wort==` in text), the key bar, the key number. Never lime text on light ground (use `akzent-text`, which turns oliv on light).
- Logo: light uhl mark on a wald tile, top right (`Folie logo`). Never on lime.
- Every layout renders in `light` and `dark`, and with only its required props (no picture = grey frame naming what belongs there).
- Spacing doubles: 12 / 24 / 48 / 96 (`--s1`…`--s4`), grid gap 32.
- Lots of air: one idea per slide, at most one headline + one supporting block.

## Commit

Private safety level: commit per finished unit, push to `main` (memory: the October deck code was lost because it was never pushed).
