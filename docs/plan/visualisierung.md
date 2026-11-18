# S6 Visualisations, content rules, attention

User F5 (2026-11-18, verbatim in docs/feedback.md): mind maps, other missing visualisations, then
audits + smoke; generated decks are boring (same slides again and again); no em dashes in content;
"&" instead of "und" in headlines; best practice against losing the audience.

## Missing visualisations (what decks of a web/marketing agency need, not covered yet)

| Family | Variants | Message it carries | Replaces |
|---|---|---|---|
| `mindmap` | radial · baum | one topic and its branches; tree = sitemap / offer structure | bullet lists of themes |
| `trichter` | breit · geteilt | stages that shrink (visitors -> leads -> customers) | text about conversion |
| `kreislauf` | ring | a loop that repeats (measure, learn, improve) | a numbered list without end |
| `vergleich` | vorher-nachher · tabelle | before/after, us vs. the usual way | two text columns |
| `pyramide` | stufen | layers that build on each other (brand house, message hierarchy) | nested bullets |
| `anteile` | streifen | parts of one whole (budget split, traffic sources) | pie charts, percent lists |

Pie charts stay out (webdesign-rules pie-chart-problem): part-to-whole = one stacked bar.

## Content rules

1. No em dash and no spaced en dash as a pause in deck content: `check:deck` fails on `—` and on
   ` – ` / ` - ` between words (ranges "2–4" without spaces stay allowed). Also for every `beispiel`.
2. Headlines: "und" -> "&" in `<T>` also next to a line break; smoke reports any headline that still
   shows "und" (UND finding).

## Attention rules (best practice, warnings in `src/deck/abwechslung.ts`)

Sources: Medina "Brain Rules" (attention drops after ~10 min, reset with a change), peak-end rule,
assertion-evidence slides (Alley), von Restorff, Cowan 4 chunks, SCQA storyline (Minto).
- Pattern interrupt: never more than three slides of the same `art` in a row (was: text only).
- Show, do not list: at least one third of the content slides are bild / zahl / diagramm.
- Strong end: the last slide is `kontakt`, `ablauf` or `offene-fragen` (a next step, not a summary).
- Skill: headline = assertion (full sentence with a verb), visualise structure (table "content
  shape -> family"), one surprise per chapter (number, client quote, before/after), SCQA order.

## Steps

1. Content rules (dash, &) + smoke UND finding.
2. New families in `src/deck/layouts/visual.tsx`, registry, gallery.
3. Attention rules + selfcheck, /slides skill (tables A/B with the new families, best practice), CLAUDE.md.
4. Audits: tsc, lint, check:deck --vorlagen/--alle, check:satz, check:abwechslung, smoke 0, screenshots.

All four steps done (S6). Smoke 0 findings on all 85 variants (max/min, light/dark).
