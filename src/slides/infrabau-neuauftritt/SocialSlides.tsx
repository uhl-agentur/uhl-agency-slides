import React from 'react';
import { Box, C, Dash, Frame, Small } from './ui';

export const SocialAufteilungSlide: React.FC = () => (
  <Frame title="Social Media: ganz oder gar nicht" section="04 Social Media">
    <div style={{ display: 'flex', height: 96, fontSize: 34, fontWeight: 700 }}>
      <div style={{ flex: 70, background: C.black, color: '#FFFFFF', display: 'flex', alignItems: 'center', paddingLeft: 32 }}>
        Instagram 70 %
      </div>
      <div style={{ flex: 30, border: `3px solid ${C.black}`, display: 'flex', alignItems: 'center', paddingLeft: 28 }}>
        LinkedIn 30 %
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '70fr 30fr', gap: 32, marginTop: 40, flex: 1 }}>
      <Box style={{ gap: 22 }}>
        <span style={{ fontSize: 28, fontWeight: 700 }}>Wohnen ist Lifestyle</span>
        <Dash
          size={27}
          gap={14}
          items={['Wohnung in 60 Sekunden', 'Rundgänge mit Persönlichkeit', 'Baustellen-Tagebuch: Rohbau, Richtfest, Übergabe', 'Grundstock an Videos vor dem Start']}
        />
      </Box>
      <Box style={{ gap: 22 }}>
        <span style={{ fontSize: 28, fontWeight: 700 }}>Zwei Absender</span>
        <Dash
          size={27}
          gap={14}
          items={['Hauptaccount: Meilensteine und Updates', 'Autorenprofile von Sabrina und Vertrieb: News, hinter den Kulissen']}
        />
      </Box>
    </div>
    <Small style={{ marginTop: 24 }}>Halbherzig weitermachen bringt nichts: entweder mit festem Rhythmus oder vorerst gar nicht.</Small>
  </Frame>
);

const refs = [
  { t: 'KLAUS Wohnbau', d: 'Erklärt eine Wohnung in 60 Sekunden. Rund 48.000 Aufrufe in fünf Tagen.' },
  { t: 'Stadtjäger Lofts', d: 'Projekt von KLAUS: Videos zu Architektur und Atmosphäre statt nur Renderings.' },
  { t: 'Mr. Unreal Estate', d: 'Rundgänge mit Persönlichkeit und Unterhaltung. Für infrabau ruhiger, das Prinzip trägt.' },
];

export const SocialVorbilderSlide: React.FC = () => (
  <Frame title="Was funktioniert" section="04 Social Media">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
      {refs.map((r) => (
        <Box key={r.t} style={{ height: 380, justifyContent: 'space-between' }}>
          <span style={{ fontSize: 36, fontWeight: 700 }}>{r.t}</span>
          <span style={{ fontSize: 27, lineHeight: 1.35 }}>{r.d}</span>
        </Box>
      ))}
    </div>
    <Box dark style={{ marginTop: 56, padding: '28px 36px' }}>
      <span style={{ fontSize: 32, fontWeight: 700 }}>Visuell überzeugt bei Wohnungen mehr als jeder Text. Aufwendiger Schnitt ist nicht nötig.</span>
    </Box>
  </Frame>
);
