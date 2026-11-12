---
name: slides
description: Builds Uhl Werbeagentur presentations (pitch, strategy, workshop, case, offer) as 1920x1080 slides in the uhl-agency-slides app with the Uhl deck system (uhl-website fonts, colours, radius; character limits per field), checks them and exports a PDF. Use for "/slides", "Präsentation", "Deck", "Folien", "Pitch-Deck", "Strategie-Deck", "Präsi bauen", and to turn the output of /marketing-strategy (deck md) or /pitch-prep (outline.md) into slides.
---

# /slides — Uhl deck system

App: `~/Documents/uhl-agency-slides` (GitHub `uhl-agentur/uhl-agency-slides`). Read its `CLAUDE.md` first: design rules, where things live.
Never build a deck as a claude.ai Artifact and never in the old Carlito look (`src/slides/`), unless the user asks.

## 1. Input

| Source | File | Map with |
|---|---|---|
| /marketing-strategy | deck md from marketing-research-writer (slides 1–8 + domains, provenance tags, `FEHLT:` markers) | table A |
| /pitch-prep | `…/07_Briefings/01_Pitch/outline.md` (Ausgangslage, Relevante Referenzen, Lösungsansatz, Nächste Schritte) | table B |
| free brief / transcript | the user's words | gallery |

Only known facts on slides. A `FEHLT:` marker never becomes invented content: it goes to the `offene-fragen` slide or stays as an open point in `notiz`; `check:deck` fails while one is left in props.

## 2. Pick layouts

Start the dev server (`npm run dev -- -p 3417`) and open `/vorlagen`: every layout in light and dark with its id, purpose and limits. The registry `src/deck/registry.ts` is the list of truth; the ids below are a starting point.

**Table A — marketing-strategy slide → layout**

| Slide (slide-checklist.json) | Layout |
|---|---|
| 1 kick-off | `strategie-kernsatz` (or `titel-bild` before it) |
| 2 marktbild | `strategie-marktbild`; numbers: `strategie-balken`, `strategie-linie`; full SWOT: `strategie-swot` |
| 3 konkurrenz | `strategie-wettbewerb`, `strategie-matrix` |
| 4 persona | `strategie-personas` + `strategie-journey` |
| 5 unternehmen | `strategie-unternehmen` |
| 6 ist-analyse-kanalmix | `strategie-kanalmix` |
| 7 kanalmix-recap | `strategie-kpi` |
| 8 roadmap | `strategie-roadmap`, then `offene-fragen`, `kontakt-abschluss` |

Frame it with `titel-*`, `inhalt-zeilen`, `kapitel-trenner` between chapters.

**Table B — pitch outline section → layout**

| Section | Layout |
|---|---|
| Deckblatt | `titel-split` / `hero-streu` |
| Ausgangslage | `problem-text`, `problem-aussage`, `einstieg-text` |
| Relevante Referenzen (one per case) | `pitch-case`; several: `kunden-logos`, `arbeiten-projekt`, `testimonial` |
| Lösungsansatz | `loesung-text`, `leistung-karten4`, `prozess-schritte`, `ablauf-zeitleiste` |
| Investition | `pitch-pakete`, `preise-spalten`, `preis-balken` |
| Team | `team-reihe` (real photos from `public/team/`) |
| Nächste Schritte | `ablauf-titel-zeitleiste`, `kontakt-abschluss` |

Rhythm: one idea per slide, alternate text-heavy and picture/number slides, at most every ~5th slide dark (`thema: 'dark'`) for chapter breaks, the same layout at most twice in a row.

## 3. Write the deck

`decks/<slug>.ts` (copy `decks/beispiel.ts`), register it in `decks/index.ts`. Content only: `{ layout, props, thema?, notiz? }` per slide. Props must match the layout's `beispiel` shape (read it in the layout file). Text rules:
- stay under every limit (shown in the gallery header; the slide outlines overflow in red),
- `==wort==` = the one lime highlight of the slide, `\n` = deliberate line break,
- German with real umlauts, numbers German ("38 %", "1.250 €"), headlines as statements, not labels,
- long compounds that must break: soft hyphen `­`.
Pictures: `{ src: '/<kunde>/datei.jpg', alt, text? }`, files under `public/<kunde>/`. Missing picture = grey frame naming the slot: say so, never fill with random stock.

## 4. Check (all must pass, "done = freshly proven")

```
npm run check:deck -- <slug>          # limits, counts, unknown layouts, FEHLT markers
npx tsc --noEmit -p .
```
Then open `/deck/<slug>` and LOOK at every slide (Puppeteer screenshot or the browser): nothing clipped, nothing on the chrome, highlights where meant. Fix content first, layout code only if the layout itself is wrong (then re-check `/vorlagen` for that layout in both themes: `npm run shots -- --ids <id> --out output/shots`).

## 5. Export and deliver

```
npm run pdf -- --route /deck/<slug> --output output/<YYMMDD>_<kunde>-<thema>-praesentation.pdf
```
Copy the PDF into the client folder on the mount (`/Volumes/Kunden/<Initial>/<Name>/…`); mount missing → say so, never write client deliverables into a repo. Then commit `decks/<slug>.ts` (+ assets) and push to `main` — decks that live only locally get lost.

## 6. Extending the system

New recurring need → new layout in the matching `src/deck/layouts/<gruppe>.tsx` (typed props, German `beispiel`, `limits`, `anzahl`), only classes and vars from `deck.css`. Verify in both themes with `npm run shots`, `npm run check:deck -- --vorlagen` must stay green.
