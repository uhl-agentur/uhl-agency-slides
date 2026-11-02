import React from 'react';
import { Box, C, Dash, Frame, Small } from './ui';

const quadrants = [
  {
    t: 'Quick Wins',
    s: 'hoher Nutzen · wenig Aufwand',
    dark: true,
    items: ['Sicher kaufen erklärt', 'Interessentenliste', 'Grundstück mit Tippgeber-Prämie', 'Besichtigung online buchen', 'Nebenkosten-Rechner', 'Preisliste Sonderwünsche'],
  },
  {
    t: 'Große Hebel',
    s: 'hoher Nutzen · mehr Aufwand',
    items: ['Online-Immobilienbewertung', 'KI-Wohnungssuche', 'Förder-Check', 'Wohnung am Gebäude auswählen'],
  },
  {
    t: 'Nice to have',
    s: 'mittlerer Nutzen · wenig Aufwand',
    items: ['Baustellen-Tagebuch', 'Energiestandard sichtbar', 'Events', 'Empfehlungsprogramm'],
  },
  {
    t: 'Später',
    s: 'mittlerer Nutzen · mehr Aufwand',
    items: ['Lagekarte mit eigener Adresse', '360°-Rundgang', 'Ausstattungs-Konfigurator', 'Digitaler Kauf'],
  },
];

export const IdeenMatrixSlide: React.FC = () => (
  <Frame title="Ideen nach Nutzen und Aufwand" section="05 Ideen">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 24, flex: 1 }}>
      {quadrants.map((q) => (
        <Box key={q.t} dark={q.dark} style={{ padding: '24px 30px', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
            <span style={{ fontSize: 30, fontWeight: 700 }}>{q.t}</span>
            <span style={{ fontSize: 20, color: q.dark ? '#BDBDBD' : C.muted }}>{q.s}</span>
          </div>
          <div style={{ columns: 2, columnGap: 32 }}>
            <Dash items={q.items} size={23} gap={8} />
          </div>
        </Box>
      ))}
    </div>
    <Small style={{ marginTop: 16 }}>Einordnung ist unsere Einschätzung. Alle Ideen einzeln im Online-Dokument.</Small>
  </Frame>
);

const BigIdea: React.FC<{ title: string; num: string; numLabel: string; what: string[]; why: string }> = ({
  title,
  num,
  numLabel,
  what,
  why,
}) => (
  <Frame title={title} section="05 Ideen">
    <div style={{ display: 'grid', gridTemplateColumns: '520px 1fr', gap: 64, flex: 1 }}>
      <div style={{ borderTop: `6px solid ${C.black}`, paddingTop: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <span style={{ fontSize: 120, fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{num}</span>
        <span style={{ fontSize: 28, color: C.muted }}>{numLabel}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <Dash items={what} size={30} gap={20} />
        <Box dark style={{ padding: '28px 36px' }}>
          <span style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.3 }}>{why}</span>
        </Box>
      </div>
    </div>
  </Frame>
);

export const OnlineBewertungSlide: React.FC = () => (
  <BigIdea
    title="Online-Immobilienbewertung"
    num="2.650"
    numLabel="Suchen pro Monat nach „Immobilie bewerten“"
    what={['Eigentümer geben Lage, Größe und Zustand ein', 'Sie bekommen eine erste Wertspanne', 'Danach Angebot: persönliche Bewertung durch infrabau']}
    why="Türöffner für Bestand und Ankauf: Kontakt zu Eigentümern, bevor sie verkaufen."
  />
);

export const AdsSlide: React.FC = () => (
  <BigIdea
    title="Ads zum Verkaufsstart"
    num="1"
    numLabel="Kampagne je Projekt, auf die Projektseite"
    what={['Google Ads auf Suchen wie „Eigentumswohnung Augsburg“', 'Meta Ads in der Region zum Verkaufsstart', '„Grundstück verkaufen“ dauerhaft mit Ads und SEO']}
    why="Schneller Anfragen, als Google allein liefert. Jede Anfrage landet in OnOffice und ist messbar."
  />
);
