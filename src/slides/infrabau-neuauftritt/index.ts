import React from 'react';
import { TitleSlide } from './TitleSlide';
import { AgendaSlide } from './AgendaSlide';
import { HeuteSlide } from './HeuteSlide';
import { IstStandSlide } from './IstStandSlide';
import { SuchpotenzialSlide } from './SuchpotenzialSlide';
import { WettbewerbSlide } from './WettbewerbSlide';
import { FazitUebersichtSlide, createFazitSlide } from './FazitSlides';
import { RoadmapGesamtSlide, createPhaseSlide } from './RoadmapSlides';
import { SocialAufteilungSlide, SocialVorbilderSlide } from './SocialSlides';
import { IdeenMatrixSlide, OnlineBewertungSlide, AdsSlide } from './IdeenSlides';
import { FragenSlide } from './FragenSlide';
import { AbschlussSlide } from './AbschlussSlide';
import { fazits, phases } from './data';

// Overview first, then one slide per item (Fazit and Roadmap)
export const allInfrabauNeuauftrittSlides: React.FC[] = [
  TitleSlide,
  AgendaSlide,
  HeuteSlide,
  IstStandSlide,
  SuchpotenzialSlide,
  WettbewerbSlide,
  FazitUebersichtSlide,
  ...fazits.map((_, i) => createFazitSlide(i)),
  RoadmapGesamtSlide,
  ...phases.map((_, i) => createPhaseSlide(i)),
  SocialAufteilungSlide,
  SocialVorbilderSlide,
  IdeenMatrixSlide,
  OnlineBewertungSlide,
  AdsSlide,
  FragenSlide,
  AbschlussSlide,
];
