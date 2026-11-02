import React from 'react';
import { C, Dash, Frame } from './ui';

const cols = [
  {
    t: 'Website & Technik',
    q: ['Wer betreut Technik und Updates heute?', 'Gibt es Backups und einen Wartungsvertrag?', 'Wie viel wollt ihr selbst pflegen?'],
  },
  {
    t: 'Werbung & Vertrieb',
    q: ['Nutzt ihr Google Ads oder Meta Ads?', 'Was kostet ein Lead über Portale?', 'Wie finden Käufer heute zu euch?'],
  },
  {
    t: 'Social & Partner',
    q: ['Übernehmen wir Social Media komplett?', 'Nehmt ihr an Ausschreibungen von Kommunen teil?', 'Was habt ihr schon versucht, was lief nicht?'],
  },
];

export const FragenSlide: React.FC = () => (
  <Frame title="Was wir mit euch klären wollen" section="06 Offene Fragen">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
      {cols.map((c) => (
        <div key={c.t} style={{ borderTop: `6px solid ${C.black}`, paddingTop: 28, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <span style={{ fontSize: 32, fontWeight: 700 }}>{c.t}</span>
          <Dash items={c.q} size={28} gap={18} />
        </div>
      ))}
    </div>
  </Frame>
);
