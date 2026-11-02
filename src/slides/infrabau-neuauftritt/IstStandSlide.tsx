import React from 'react';
import { Chip, Frame, Small } from './ui';

// filled = fehlt, outline = Baustelle, light = ok/offen
const rows: [string, string, 'filled' | 'outline' | 'light', string][] = [
  ['Website', 'fehlt', 'filled', 'Offline, davor veraltet und unsicher'],
  ['Google-Suche', 'fällt weg', 'filled', 'Rankings nur noch aus dem alten Index'],
  ['Google-Profil', 'Baustelle', 'outline', '4,6 Sterne aus 40, Kritik ohne Antwort'],
  ['Firmendaten', 'Baustelle', 'outline', 'Drei Adressen, zwei Nummern im Netz'],
  ['Social Media', 'Baustelle', 'outline', 'Läuft, überzeugt aktuell nicht'],
  ['Foto und Video', 'Baustelle', 'outline', 'Starke Renderings, kaum echte Bilder'],
  ['Print und Baustelle', 'ok', 'light', 'Exposés und Bauschilder je Projekt'],
];

export const IstStandSlide: React.FC = () => (
  <Frame title="Ist-Stand je Kanal" section="01 Ausgangslage">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      {rows.map(([k, s, v, d]) => (
        <div key={k} style={{ display: 'grid', gridTemplateColumns: '200px 380px 1fr', alignItems: 'center' }}>
          <Chip filled={v === 'filled'} light={v === 'light'}>{s}</Chip>
          <span style={{ fontSize: 30, fontWeight: 700 }}>{k}</span>
          <span style={{ fontSize: 28 }}>{d}</span>
        </div>
      ))}
    </div>
    <Small style={{ marginTop: 'auto' }}>Bezahlte Werbung: nicht bekannt, klären wir heute.</Small>
  </Frame>
);
