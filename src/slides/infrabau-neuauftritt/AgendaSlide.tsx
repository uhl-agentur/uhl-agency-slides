import React from 'react';
import { C, Frame } from './ui';

const items = [
  ['01', 'Ausgangslage', 'Geschäftsfelder, Kanäle, Suche, Wettbewerb'],
  ['02', 'Fazit', 'Was wir aus der Recherche ziehen'],
  ['03', 'Roadmap', 'Gesamtbild und die vier Phasen'],
  ['04', 'Social Media', 'Ganz oder gar nicht'],
  ['05', 'Ideen', 'Was zusätzlich Mehrwert bringt'],
  ['06', 'Offene Fragen', 'Was wir mit euch klären wollen'],
];

export const AgendaSlide: React.FC = () => (
  <Frame title="Agenda">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 44, paddingTop: 24 }}>
      {items.map(([n, t, d]) => (
        <div key={n} style={{ display: 'grid', gridTemplateColumns: '120px 560px 1fr', alignItems: 'baseline' }}>
          <span style={{ fontSize: 30, color: C.muted }}>{n}</span>
          <span style={{ fontSize: 36, fontWeight: 700 }}>{t}</span>
          <span style={{ fontSize: 26, color: C.muted }}>{d}</span>
        </div>
      ))}
    </div>
  </Frame>
);
