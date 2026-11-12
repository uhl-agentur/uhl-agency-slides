import type { LayoutDef } from './typen';
import { titelLayouts } from './layouts/titel';
import { einstiegLayouts } from './layouts/einstieg';
import { loesungLayouts } from './layouts/loesung';
import { beweisLayouts } from './layouts/beweis';
import { portfolioLayouts } from './layouts/portfolio';
import { strategieLayouts } from './layouts/strategie';

/* All layouts in gallery order. Each layout file exports one array; add it here once. */
export const layouts: LayoutDef[] = [
  ...titelLayouts,
  ...einstiegLayouts,
  ...loesungLayouts,
  ...beweisLayouts,
  ...portfolioLayouts,
  ...strategieLayouts,
];

export const layoutNach = (id: string) => layouts.find((l) => l.id === id);
