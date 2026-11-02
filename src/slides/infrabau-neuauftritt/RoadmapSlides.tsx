import React from 'react';
import { Box, C, Dash, Frame, Small } from './ui';
import { phases } from './data';

// Short labels for the overview; details live on the phase slides
const overview: { pflicht: string[]; optional: string[] }[] = [
  { pflicht: ['Hosting-Umzug', 'Aufräumen, Zugänge neu', 'Bewertungen, Firmendaten'], optional: [] },
  { pflicht: ['Hauptseite schlank online', 'Einstiege je Zielgruppe', 'Anfragen in OnOffice'], optional: ['Rechner', 'Online-Termin'] },
  { pflicht: ['Vorlage für alle Projekte', 'Wertachufer zuerst', 'Domains leiten weiter'], optional: ['Ads zum Verkaufsstart', 'Förder-Check'] },
  { pflicht: ['Ortsseiten, Ratgeber', 'Messen', 'Betreuung'], optional: ['Online-Bewertung', 'KI-Suche', '3D, Konfigurator'] },
];

const laneLabel: React.CSSProperties = { fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center' };
const cellText = 22;

export const RoadmapGesamtSlide: React.FC = () => (
  <Frame title="Roadmap im Überblick" section="03 Roadmap">
    <div style={{ display: 'grid', gridTemplateColumns: '170px repeat(4, 1fr)', gridTemplateRows: 'auto 1fr auto 1fr', gap: 16, flex: 1 }}>
      <span />
      {phases.map((p) => (
        <div key={p.n} style={{ borderTop: `6px solid ${C.black}`, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 22, color: C.muted }}>Phase {p.n}</span>
          <span style={{ fontSize: 30, fontWeight: 700 }}>{p.title}</span>
        </div>
      ))}

      <span style={laneLabel}>Pflicht</span>
      {overview.map((o, i) => (
        <Box key={i} dark style={{ padding: '22px 24px' }}>
          <Dash items={o.pflicht} size={cellText} gap={10} />
        </Box>
      ))}

      <span style={laneLabel}>Social Media</span>
      <div style={{ background: C.light, border: `3px solid ${C.black}`, gridColumn: '3 / span 3', padding: '18px 24px', fontSize: cellText }}>
        <b>Ganz oder gar nicht.</b> Instagram 70 %, LinkedIn 30 %, Start mit einem Grundstock an Videos.
      </div>
      <span />
      {/* keep the grid aligned: social row spans phase 2 to 4, phase 1 stays empty */}

      <span style={{ ...laneLabel, color: C.muted }}>Optional</span>
      {overview.map((o, i) => (
        <div key={i} style={{ border: `2px dashed ${C.muted}`, padding: '22px 24px' }}>
          {o.optional.length ? <Dash items={o.optional} size={cellText} gap={10} color={C.muted} /> : null}
        </div>
      ))}
    </div>
  </Frame>
);

export const createPhaseSlide = (i: number): React.FC => {
  const p = phases[i];
  const Slide: React.FC = () => (
    <Frame title={`Phase ${p.n}: ${p.title}`} section="03 Roadmap">
      <div style={{ fontSize: 32, marginBottom: 48 }}>{p.ziel}</div>
      <div style={{ display: 'grid', gridTemplateColumns: p.optional.length ? '1.2fr 1fr' : '1fr', gap: 40, flex: 1 }}>
        <Box dark style={{ padding: '36px 40px', gap: 26 }}>
          <span style={{ fontSize: 26, color: '#BDBDBD' }}>Pflicht</span>
          <Dash items={p.pflicht} size={30} gap={20} />
        </Box>
        {p.optional.length > 0 && (
          <div style={{ border: `3px dashed ${C.muted}`, padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 26 }}>
            <span style={{ fontSize: 26, color: C.muted }}>Optional</span>
            <Dash items={p.optional} size={30} gap={20} />
          </div>
        )}
      </div>
      <Small style={{ marginTop: 24 }}>Phase {p.n} von {phases.length}</Small>
    </Frame>
  );
  Slide.displayName = `PhaseSlide${p.n}`;
  return Slide;
};
