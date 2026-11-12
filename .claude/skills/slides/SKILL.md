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

## 2. Pick families and variants

Layouts are **families** (one message) with **variants** (compositions of it). Start the dev server (`npm run dev -- -p 3417`) and open `/vorlagen`: every family with all variants in light and dark, each with `art`, needed pictures, purpose and limits. The registry `src/deck/registry.ts` is the list of truth; the tables name per section the family and the allowed variants (`familie: a | b | c`).

**Table A — marketing-strategy slide → family**

| Slide (slide-checklist.json) | Family: allowed variants |
|---|---|
| frame | `titel: vollbild \| bild-haelfte \| links` · `inhalt: zeilen \| gross \| bild` · `kapitel: trenner \| bilder` between chapters |
| 1 kick-off | `strategie-kernsatz` |
| 2 marktbild | `strategie-marktbild` + `strategie-swot` as its own slide; numbers: `diagramm: balken \| linie` |
| 3 konkurrenz | `strategie-wettbewerb`, `diagramm: matrix` |
| 4 persona | `strategie-personas` + `strategie-journey` |
| 5 unternehmen | `strategie-unternehmen`; trust numbers `kennzahlen: drei \| text-sechs \| sechs \| bild`; design direction `text-bilder: mosaik \| projekt` or `aussage-bild: vollbild \| rahmen` |
| 6 ist-analyse-kanalmix | `strategie-kanalmix` |
| 7 kanalmix-recap | `strategie-kpi` |
| 8 roadmap | `strategie-roadmap`, then `offene-fragen`, `kontakt: abschluss \| mail \| bild \| spalten` |

**Table B — pitch outline section → family**

| Section | Family: allowed variants |
|---|---|
| Deckblatt | `titel: bild-haelfte \| streu \| vollbild \| links` |
| Ausgangslage | `text: liste \| einleitung` · `aussage-bild: vollbild \| bild-links \| bild-rechts \| hochkant` · `aussage-bilder: saetze \| mosaik \| raster` |
| Relevante Referenzen (one per case) | `beweis: case \| stimme`; several: `beweis: logos \| jahre`, `text-bilder: projekt`, `galerie: reihe \| raster6 \| bento8` |
| Lösungsansatz | `text: loesung \| zentriert \| zwei-spalten` · `leistungen: karten \| spalten \| treppe` · `aussage-bilder: zickzack \| verstreut \| umrahmt \| zwischen` · `ablauf: schritte \| zeitleiste \| titel-zeitleiste` |
| Investition | `preise: pakete \| spalten \| balken` |
| Team | `team` (real photos from `public/team/`, one per member) |
| Nächste Schritte | `ablauf: zeitleiste-aussage \| titel-zeitleiste`, `kontakt: abschluss \| mail \| bild` |

**Choice procedure (every deck, F4 "nicht immer dieselben Slides … abwechseln"):**
1. Set the deck's `art` (`pitch` / `strategie` / `sonstige`). Read the decks of the same `art` in `decks/` (registration order in `decks/index.ts` = age, last = newest) and note which variant each family used.
2. Per section, from its allowed variants: drop every variant whose `bilder` (gallery header: "n Bilder nötig") exceeds the real pictures you have for it. **Never pick a picture variant without pictures**: grey placeholder frames never ship, `check:deck` fails on them. Every family with picture variants has one that needs none.
3. Of the rest, take the variant used least recently in the decks of step 1 (not in the newest = first choice); tie → the first listed.
4. Inside the deck: no variant twice in a row, a family at most twice in a row, a variant at most twice per deck, never more than three text slides in a row (alternate with bild / zahl / diagramm). One idea per slide, one headline + one supporting block (no second paragraph without a reason).
5. Theme set once in `thema` (every variant exists in light and dark); single slides may switch for chapter breaks.

## 3. Write the deck

`decks/<slug>.ts` (copy `decks/beispiel.ts`), register it in `decks/index.ts`. Content only: `{ layout: '<familie>', variante: '<key>', props, thema?, notiz? }` per slide (no `variante` = the family's first). Props must match the variant's `beispiel` shape (read it in the layout file; variants of one family mostly share it). Text rules:
- stay under every limit (shown in the gallery header; the slide outlines overflow in red),
- `==wort==` = the one lime highlight of the slide, `\n` = deliberate line break,
- German with real umlauts, numbers German ("38 %", "1.250 €"), headlines as statements, not labels,
- long compounds that must break: soft hyphen `­`.
Pictures: `{ src: '/<kunde>/datei.jpg', alt, text? }`, files under `public/<kunde>/`. Missing picture = pick a variant that needs none (step 2), never a grey frame, never random stock; tell the user which pictures would unlock a picture variant.

## 4. Check (all must pass, "done = freshly proven")

```
npm run check:deck -- <slug>          # ✗ = must fix: limits, counts, unknown family/variant, empty picture slots, FEHLT markers
                                      # ! = variation warning: switch the variant it names unless the content forbids it; tell the user which you kept
npx tsc --noEmit -p .
```
Then open `/deck/<slug>` and LOOK at every slide (Puppeteer screenshot or the browser): nothing clipped, nothing on the chrome, highlights where meant. Fix content first, layout code only if the layout itself is wrong (then re-check `/vorlagen` for that variant in both themes: `npm run shots -- --ids <familie>/<variante> --out output/shots`).

## 5. Export and deliver

```
npm run pdf -- --route /deck/<slug> --output output/<YYMMDD>_<kunde>-<thema>-praesentation.pdf
```
Copy the PDF into the client folder on the mount (`/Volumes/Kunden/<Initial>/<Name>/…`); mount missing → say so, never write client deliverables into a repo. Then commit `decks/<slug>.ts` (+ assets) and push to `main` — decks that live only locally get lost.

## 6. Extending the system

Same message, new composition → a new **variant** of the existing family (same props where possible; a parameter on the existing component if only side, grid or count differ). New message → new family in `registry.familien` plus its variants in the matching `src/deck/layouts/<datei>.tsx` (typed props, German `beispiel`, `limits`, `anzahl`, `art`, `bilder`), only classes and vars from `deck.css`. Verify: `npm run smoke` (0 findings), `npm run check:deck -- --vorlagen`, `npm run check:abwechslung`.
