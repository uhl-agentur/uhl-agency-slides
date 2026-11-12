import type { LayoutDef } from './typen';
import { titelLayouts } from './layouts/titel';
import { einstiegLayouts } from './layouts/einstieg';
import { loesungLayouts } from './layouts/loesung';
import { beweisLayouts } from './layouts/beweis';
import { portfolioLayouts } from './layouts/portfolio';
import { strategieLayouts } from './layouts/strategie';

/* Families in gallery order (S5). A family = one message; its variants = compositions of it.
   Each layout file exports one array; add it below once, and a new family here. */
export const familien: { id: string; name: string }[] = [
  { id: 'titel', name: 'Titel' },
  { id: 'inhalt', name: 'Inhalt' },
  { id: 'kapitel', name: 'Kapitel' },
  { id: 'text', name: 'Text' },
  { id: 'aussage-bild', name: 'Aussage mit Bild' },
  { id: 'aussage-bilder', name: 'Aussage mit Bildern' },
  { id: 'text-bilder', name: 'Text mit Bildern' },
  { id: 'galerie', name: 'Galerie' },
  { id: 'leistungen', name: 'Leistungen' },
  { id: 'ablauf', name: 'Ablauf' },
  { id: 'kennzahlen', name: 'Kennzahlen' },
  { id: 'beweis', name: 'Beweis' },
  { id: 'preise', name: 'Preise' },
  { id: 'diagramm', name: 'Diagramm' },
  { id: 'team', name: 'Team' },
  { id: 'strategie-kernsatz', name: 'Strategie-Kernsatz' },
  { id: 'strategie-marktbild', name: 'Marktbild' },
  { id: 'strategie-swot', name: 'SWOT' },
  { id: 'strategie-wettbewerb', name: 'Wettbewerb' },
  { id: 'strategie-personas', name: 'Personas' },
  { id: 'strategie-journey', name: 'User Journey' },
  { id: 'strategie-unternehmen', name: 'Unternehmen' },
  { id: 'strategie-kanalmix', name: 'Kanalmix' },
  { id: 'strategie-kpi', name: 'KPI' },
  { id: 'strategie-roadmap', name: 'Roadmap' },
  { id: 'offene-fragen', name: 'Offene Fragen' },
  { id: 'kontakt', name: 'Kontakt' },
];

const rang = (l: LayoutDef) => familien.findIndex((f) => f.id === l.familie);

/* All variants, grouped by family in the order above (variants keep their file order). */
export const layouts: LayoutDef[] = [
  ...titelLayouts,
  ...einstiegLayouts,
  ...loesungLayouts,
  ...beweisLayouts,
  ...portfolioLayouts,
  ...strategieLayouts,
].sort((a, b) => rang(a) - rang(b));

/** a family's variant; no variante = the family's first variant */
export const layoutNach = (familie: string, variante?: string) =>
  layouts.find((l) => l.familie === familie && (variante === undefined || l.variante === variante));

export const varianten = (familie: string) => layouts.filter((l) => l.familie === familie);
