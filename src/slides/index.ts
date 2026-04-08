// Section 01: Ihr Unternehmen & Zielgruppen
export {
  TitleSlide,
  AgendaSlide,
  SectionDivider01,
  UnternehmenSlide,
  ZielgruppeSlide,
  CompetitorSlide,
  IstSollSlide,
} from './section-01';

// Section 02: Branding & Corporate Design
export {
  SectionDivider02,
  AktuellesDesignSlide,
  VibeValuesSlide,
  LikeDislikeSlide,
} from './section-02';

// Section 03: Website & Technik
export {
  SectionDivider03,
  WebsiteZieleSlide,
  IstStatusSlide,
  InspirationSlide,
  FeaturesSlide,
  ContentSlide,
  SpecsSlide,
} from './section-03';

// Section 04: Projekt & Zusammenarbeit
export {
  SectionDivider04,
  ProjektablaufSlide,
  KommunikationSlide,
  ZusammenfassungSlide,
} from './section-04';

// Section 05: Abschluss
export {
  SectionDivider05,
  NextStepsSlide,
  OffeneFragenSlide,
  AbschlussSlide,
} from './section-05';

// Export all slides as an array for easy iteration
import { TitleSlide } from './section-01/TitleSlide';
import { AgendaSlide } from './section-01/AgendaSlide';
import { SectionDivider01 } from './section-01/SectionDivider01';
import { UnternehmenSlide } from './section-01/UnternehmenSlide';
import { ZielgruppeSlide } from './section-01/ZielgruppeSlide';
import { CompetitorSlide } from './section-01/CompetitorSlide';
import { IstSollSlide } from './section-01/IstSollSlide';

import { SectionDivider02 } from './section-02/SectionDivider02';
import { AktuellesDesignSlide } from './section-02/AktuellesDesignSlide';
import { VibeValuesSlide } from './section-02/VibeValuesSlide';
import { LikeDislikeSlide } from './section-02/LikeDislikeSlide';

import { SectionDivider03 } from './section-03/SectionDivider03';
import { WebsiteZieleSlide } from './section-03/WebsiteZieleSlide';
import { IstStatusSlide } from './section-03/IstStatusSlide';
import { InspirationSlide } from './section-03/InspirationSlide';
import { FeaturesSlide } from './section-03/FeaturesSlide';
import { ContentSlide } from './section-03/ContentSlide';
import { SpecsSlide } from './section-03/SpecsSlide';

import { SectionDivider04 } from './section-04/SectionDivider04';
import { ProjektablaufSlide } from './section-04/ProjektablaufSlide';
import { KommunikationSlide } from './section-04/KommunikationSlide';
import { ZusammenfassungSlide } from './section-04/ZusammenfassungSlide';

import { SectionDivider05 } from './section-05/SectionDivider05';
import { NextStepsSlide } from './section-05/NextStepsSlide';
import { OffeneFragenSlide } from './section-05/OffeneFragenSlide';
import { AbschlussSlide } from './section-05/AbschlussSlide';

// All slides in presentation order (26 total)
export const allSlides = [
  // Section 01: Ihr Unternehmen & Zielgruppen (7 slides)
  TitleSlide,           // 1
  AgendaSlide,          // 2
  SectionDivider01,     // 3
  UnternehmenSlide,     // 4
  ZielgruppeSlide,      // 5
  CompetitorSlide,      // 6
  IstSollSlide,         // 7
  // Section 02: Branding & Corporate Design (4 slides)
  SectionDivider02,     // 8
  AktuellesDesignSlide, // 9
  VibeValuesSlide,      // 10
  LikeDislikeSlide,     // 11
  // Section 03: Website & Technik (7 slides)
  SectionDivider03,     // 12
  WebsiteZieleSlide,    // 13
  IstStatusSlide,       // 14
  InspirationSlide,     // 15
  FeaturesSlide,        // 16
  ContentSlide,         // 17
  SpecsSlide,           // 18
  // Section 04: Projekt & Zusammenarbeit (4 slides)
  SectionDivider04,     // 19
  ProjektablaufSlide,   // 20
  KommunikationSlide,   // 21
  ZusammenfassungSlide, // 22
  // Section 05: Abschluss (4 slides)
  SectionDivider05,     // 23
  NextStepsSlide,       // 24
  OffeneFragenSlide,    // 25
  AbschlussSlide,       // 26
];

// Slide metadata for filtering
export const slideMetadata = [
  // Section 01
  { id: 'title', sectionId: '01', name: 'Title' },
  { id: 'agenda', sectionId: '01', name: 'Agenda' },
  { id: 'divider01', sectionId: '01', name: 'Section Divider 01' },
  { id: 'unternehmen', sectionId: '01', name: 'Unternehmen' },
  { id: 'zielgruppe', sectionId: '01', name: 'Zielgruppe' },
  { id: 'competitor', sectionId: '01', name: 'Wettbewerber' },
  { id: 'istSoll', sectionId: '01', name: 'Ist & Soll' },
  // Section 02
  { id: 'divider02', sectionId: '02', name: 'Section Divider 02' },
  { id: 'aktuellesDesign', sectionId: '02', name: 'Aktuelles Design' },
  { id: 'vibeValues', sectionId: '02', name: 'Vibe & Values' },
  { id: 'likeDislike', sectionId: '02', name: 'Like & Dislike' },
  // Section 03
  { id: 'divider03', sectionId: '03', name: 'Section Divider 03' },
  { id: 'websiteZiele', sectionId: '03', name: 'Website Ziele' },
  { id: 'istStatus', sectionId: '03', name: 'Ist-Status' },
  { id: 'inspiration', sectionId: '03', name: 'Inspiration' },
  { id: 'features', sectionId: '03', name: 'Features' },
  { id: 'content', sectionId: '03', name: 'Content' },
  { id: 'specs', sectionId: '03', name: 'Technische Specs' },
  // Section 04
  { id: 'divider04', sectionId: '04', name: 'Section Divider 04' },
  { id: 'projektablauf', sectionId: '04', name: 'Projektablauf' },
  { id: 'kommunikation', sectionId: '04', name: 'Kommunikation' },
  { id: 'zusammenfassung', sectionId: '04', name: 'Zusammenfassung' },
  // Section 05
  { id: 'divider05', sectionId: '05', name: 'Section Divider 05' },
  { id: 'nextSteps', sectionId: '05', name: 'Next Steps' },
  { id: 'offeneFragen', sectionId: '05', name: 'Offene Fragen' },
  { id: 'abschluss', sectionId: '05', name: 'Abschluss' },
];
