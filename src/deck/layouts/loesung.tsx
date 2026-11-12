import React from 'react';
import { BarChart3, Camera, Compass, Gauge, Globe, Handshake, Layers, Lightbulb, MapPin, Megaphone, MessageCircle, MousePointerClick, Palette, PenTool, Rocket, Search, ShieldCheck, Sparkles, Target, Users, Video } from 'lucide-react';
import { Bild, BildDaten, Folie, Liste, T } from '../system';
import type { LayoutDef } from '../typen';

/* Solution and work showcase (akoya 18-28): solution statements with text and
   pictures, feature cards with icons, and picture grids from bento to a
   full-bleed masonry. Scattered compositions use absolute slide coordinates
   (1920 x 1080) and keep clear of the chrome band (168 top, 152 bottom). */

/** Picture or grey frame named after its slot. */
const slot = (bilder: BildDaten[] | undefined, i: number, name = 'Bild') => ({ bild: bilder?.[i], platzhalter: `${name} ${i + 1}` });

/** Picture grids leave the chrome band free but use more height than text slides. */
const galerie: React.CSSProperties = { position: 'absolute', top: 128, bottom: 128, left: 'var(--rand)', right: 'var(--rand)', display: 'grid', gap: 'var(--gap)' };

/* --------------------------------------------------------- loesung-text --- */
interface LoesungText {
  label?: string;
  titel: string;
  text: string;
  /** optional second paragraph; leave it out unless it carries its own point (feedback F1: no double paragraphs) */
  zusatz?: string;
  punkteTitel?: string;
  punkte?: string[];
}

const LoesungTextL: React.FC<LoesungText> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)', alignItems: 'center' }}>
      <div className="stapel-l">
        <T stil="body" max={160}>
          {p.text}
        </T>
        <T stil="body" max={100}>
          {p.zusatz}
        </T>
        {p.punkte?.length ? (
          <div className="stapel-s">
            <T stil="body" className="t-stark" max={30}>
              {p.punkteTitel}
            </T>
            <Liste punkte={p.punkte} max={40} />
          </div>
        ) : null}
      </div>
      <div>
        <T stil="aussage" as="h2" max={48}>
          {p.titel}
        </T>
      </div>
    </div>
  </Folie>
);

/* ------------------------------------------------------ loesung-zickzack --- */
interface Zickzack {
  label?: string;
  oben: string;
  unten: string;
  bilder?: BildDaten[];
}

const ZickzackL: React.FC<Zickzack> = (p) => {
  const satz = (s: string, as: 'h2' | 'p') => (
    <div style={{ display: 'grid', placeItems: 'center', textAlign: 'center', padding: '0 var(--s3)' }}>
      <T stil="titel" as={as} max={64} style={{ maxWidth: 640 }}>
        {s}
      </T>
    </div>
  );
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 'var(--gap)' }}>
        {satz(p.oben, 'h2')}
        <Bild {...slot(p.bilder, 0)} unterschrift={false} style={{ height: '100%' }} />
        <Bild {...slot(p.bilder, 1)} unterschrift={false} style={{ height: '100%' }} />
        {satz(p.unten, 'p')}
      </div>
    </Folie>
  );
};

/* ----------------------------------------------------- loesung-verstreut --- */
interface Schritt {
  titel: string;
  text?: string;
  bild?: BildDaten;
}
interface Verstreut {
  label?: string;
  schritte: Schritt[];
}

/* left, top, width, height of each picture (slide px); caption runs below */
const verstreutPos: [number, number, number, number][] = [
  [192, 168, 440, 440],
  [760, 470, 360, 240],
  [1296, 248, 420, 380],
];

const VerstreutL: React.FC<Verstreut> = (p) => (
  <Folie label={p.label}>
    {verstreutPos.map(([left, top, width, height], i) => {
      const s = p.schritte[i];
      return (
        <div key={i} style={{ position: 'absolute', left, top, width }}>
          <Bild bild={s?.bild} platzhalter={`Bild ${i + 1}`} unterschrift={false} style={{ height }} />
          {s && (
            <div className="stapel-s" style={{ marginTop: 'var(--s2)' }}>
              <T stil="karte" as="h3" max={28}>
                {s.titel}
              </T>
              <T stil="body" leise max={80}>
                {s.text}
              </T>
            </div>
          )}
        </div>
      );
    })}
  </Folie>
);

/* -------------------------------------------------------- loesung-mitte --- */
interface Mitte {
  label?: string;
  satz: string;
  bilder?: BildDaten[];
}

const mittePos: [number, number, number, number][] = [
  [560, 168, 180, 200],
  [1400, 168, 424, 420],
  [140, 470, 300, 330],
  [1020, 708, 180, 184],
];

const MitteL: React.FC<Mitte> = (p) => (
  <Folie label={p.label}>
    {mittePos.map(([left, top, width, height], i) => (
      <div key={i} style={{ position: 'absolute', left, top, width }}>
        <Bild bild={p.bilder?.[i]} platzhalter={`Bild ${i + 1}`} unterschrift={false} style={{ height }} />
        <T stil="meta" leise max={24} className="bildunterschrift">
          {p.bilder?.[i]?.text}
        </T>
      </div>
    ))}
    <div className="voll" style={{ display: 'grid', placeItems: 'center', textAlign: 'center' }}>
      <T stil="titel" as="h2" max={64} style={{ maxWidth: 740 }}>
        {p.satz}
      </T>
    </div>
  </Folie>
);

/* --------------------------------------------------- loesung-bilder-text --- */
interface BilderText {
  label?: string;
  titel: string;
  text?: string;
  punkte?: string[];
  bilder?: BildDaten[];
}

const bilderTextPos: [number, number, number, number][] = [
  [96, 168, 400, 420],
  [592, 500, 320, 300], /* right edge 912 = end of the left half (50/50) */
];

const BilderTextL: React.FC<BilderText> = (p) => (
  <Folie label={p.label}>
    {bilderTextPos.map(([left, top, width, height], i) => (
      <div key={i} style={{ position: 'absolute', left, top, width }}>
        <Bild bild={p.bilder?.[i]} platzhalter={`Bild ${i + 1}`} unterschrift={false} style={{ height }} />
        <T stil="meta" leise max={60} className="bildunterschrift">
          {p.bilder?.[i]?.text}
        </T>
      </div>
    ))}
    <div style={{ position: 'absolute', top: 'var(--oben)', bottom: 'var(--unten)', left: 1008, right: 'var(--rand)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="stapel-l">
        <T stil="titel" as="h2" max={60}>
          {p.titel}
        </T>
        <T stil="lead" leise max={110}>
          {p.text}
        </T>
        <Liste punkte={p.punkte} stil="lead" max={34} />
      </div>
    </div>
  </Folie>
);

/* ------------------------------------------------------ leistung-karten4 --- */
const ikonen = { BarChart3, Camera, Compass, Gauge, Globe, Handshake, Layers, Lightbulb, MapPin, Megaphone, MessageCircle, MousePointerClick, Palette, PenTool, Rocket, Search, ShieldCheck, Sparkles, Target, Users, Video };
/** lucide icon name, e.g. "Search", "PenTool", "BarChart3" */
export type IkonName = keyof typeof ikonen;

interface Karte {
  ikon: IkonName;
  titel: string;
  text: string;
}
interface Karten4 {
  label?: string;
  titel: string;
  karten: Karte[];
}

const Karten4L: React.FC<Karten4> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
      <T stil="aussage" as="h2" max={56}>
        {p.titel}
      </T>
      <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: `repeat(${p.karten.length}, 1fr)`, gap: 'var(--gap)' }}>
        {p.karten.map((k, i) => {
          const Ikon = ikonen[k.ikon] ?? Sparkles;
          return (
            /* icon top, text bottom: content touches the padding on every side (F3) */
            <div key={i} className="kachel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'var(--s3)' }}>
              <div className="ikon">
                <Ikon size={28} strokeWidth={1.75} />
              </div>
              <div className="stapel-s">
                <T stil="karte" as="h3" max={28}>
                  {k.titel}
                </T>
                <T stil="body" leise max={90}>
                  {k.text}
                </T>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </Folie>
);

/* ------------------------------------------------------ leistung-mosaik --- */
interface Mosaik {
  label?: string;
  titel?: string;
  text: string;
  punkte?: string[];
  bilder?: BildDaten[];
}

const MosaikL: React.FC<Mosaik> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
      <div className="stapel-l" style={{ alignSelf: 'center' }}>
        <T stil="titel" as="h2" max={48}>
          {p.titel}
        </T>
        <T stil="body" max={140}>
          {p.text}
        </T>
        <Liste punkte={p.punkte} max={40} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr', gap: 'var(--gap)' }}>
        {[1, 2, 2, 1].map((span, i) => (
          <Bild key={i} {...slot(p.bilder, i)} style={{ gridColumn: `span ${span}`, minHeight: 0 }} />
        ))}
      </div>
    </div>
  </Folie>
);

/* ------------------------------------------------------ picture grids --- */
interface Galerie {
  label?: string;
  bilder: BildDaten[];
}

const Bento8L: React.FC<Galerie> = (p) => (
  <Folie label={p.label}>
    <div style={{ ...galerie, gridTemplateColumns: '2fr 3.4fr 2fr 3.4fr', gridTemplateRows: '1fr 1fr' }}>
      {Array.from({ length: 8 }, (_, i) => (
        <Bild key={i} {...slot(p.bilder, i, 'Projekt')} style={{ minHeight: 0 }} />
      ))}
    </div>
  </Folie>
);

const Bento53L: React.FC<Galerie> = (p) => (
  <Folie label={p.label}>
    <div style={{ ...galerie, gridTemplateColumns: 'repeat(15, 1fr)', gridTemplateRows: '1fr 1fr' }}>
      {[3, 3, 3, 3, 3, 6, 5, 4].map((span, i) => (
        <Bild key={i} {...slot(p.bilder, i, 'Projekt')} style={{ gridColumn: `span ${span}`, minHeight: 0 }} />
      ))}
    </div>
  </Folie>
);

const Raster6L: React.FC<Galerie> = (p) => (
  <Folie label={p.label}>
    <div style={{ ...galerie, gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr' }}>
      {Array.from({ length: 6 }, (_, i) => (
        <Bild key={i} {...slot(p.bilder, i, 'Projekt')} style={{ minHeight: 0 }} />
      ))}
    </div>
  </Folie>
);

/* full bleed: 5 columns, tiles run off every edge; [column, top, height] */
const masonrySpalte = 400;
const masonryLinks = (1920 - (5 * masonrySpalte + 4 * 32)) / 2;
const masonryPos: [number, number, number][] = [
  [0, -80, 560], [0, 512, 640],
  [1, -200, 480], [1, 312, 520], [1, 864, 400],
  [2, -140, 640], [2, 532, 600],
  [3, -280, 440], [3, 192, 520], [3, 744, 440],
  [4, -60, 400], [4, 372, 560], [4, 964, 300],
];

const MasonryL: React.FC<Galerie> = (p) => (
  <Folie chrome={false} logo={false}>
    {masonryPos.map(([spalte, top, height], i) => (
      <Bild
        key={i}
        {...slot(p.bilder, i, 'Projekt')}
        unterschrift={false}
        style={{ position: 'absolute', left: masonryLinks + spalte * (masonrySpalte + 32), top, width: masonrySpalte, height }}
      />
    ))}
  </Folie>
);

/* ------------------------------------------------------------ beispiele --- */
const loesungText: LoesungText = {
  label: 'Lösung',
  titel: 'Eine Website, die Anfragen ==vorsortiert==',
  text: 'Der neue Auftritt führt Interessenten in drei Schritten zur passenden Leistung und liefert dem Vertrieb vollständige Anfragen statt loser Rückrufbitten.',
  punkteTitel: 'Leitprinzipien',
  punkte: ['Klar vor kreativ', 'Jede Seite hat ein Ziel', 'Messbar ab dem ersten Tag'],
};

const zickzack: Zickzack = {
  label: 'Lösung',
  oben: 'Ein Auftritt, der zeigt, wer Sie wirklich sind.',
  unten: 'Ein Anfrageweg, der ==Ihrem Vertrieb== Zeit spart.',
  bilder: [{}, {}],
};

const verstreut: Verstreut = {
  label: 'Lösung',
  schritte: [
    { titel: 'Erster Eindruck', text: 'Startseite mit klarem Nutzenversprechen und echten Bildern aus dem Betrieb.' },
    { titel: 'Geführte Auswahl', text: 'Drei Fragen führen zur passenden Leistung.' },
    { titel: 'Vollständige Anfrage', text: 'Der Vertrieb erhält alle Angaben gebündelt per E-Mail und im CRM.' },
  ],
};

const mitte: Mitte = {
  label: 'Lösung',
  satz: 'Ein System aus Website, Anzeigen und CRM, das ==zusammen== arbeitet.',
  bilder: [{ text: 'Website' }, { text: 'Google Ads' }, { text: 'Social Media' }, { text: 'CRM-Anbindung' }],
};

const bilderText: BilderText = {
  label: 'Lösung',
  titel: 'Mehr qualifizierte Anfragen ohne mehr Aufwand im Büro',
  punkte: ['Ein Anfragepfad statt fünf', 'Klare Zuständigkeiten', 'Monatlicher Bericht'],
  bilder: [{ text: 'Startseite mit Leistungsauswahl' }, { text: 'Anfragepfad auf dem Smartphone' }],
};

const karten4: Karten4 = {
  label: 'Leistung',
  titel: 'Alles, was Ihre Marke für ==mehr Anfragen== braucht',
  karten: [
    { ikon: 'Compass', titel: 'Strategie', text: 'Zielgruppen, Positionierung und ein Kanalplan, der zu Ihrem Budget passt.' },
    { ikon: 'PenTool', titel: 'Design und Text', text: 'Ein Auftritt, der Ihre Stärken zeigt und in jeder Zeile Vertrauen schafft.' },
    { ikon: 'Globe', titel: 'Website', text: 'Schnell, auffindbar und selbst pflegbar, mit einem klaren Anfrageweg.' },
    { ikon: 'BarChart3', titel: 'Kampagnen', text: 'Google Ads und Social Ads mit festen Zielen und einem Bericht jeden Monat.' },
  ],
};

const mosaik: Mosaik = {
  label: 'Leistung',
  titel: 'Website-Relaunch für einen Handwerksbetrieb',
  text: 'Ein Familienbetrieb aus der Region bekam einen Auftritt, der Leistungen verständlich erklärt und Anfragen direkt zuordnet.',
  punkte: ['Bildsprache aus eigenem Fotoshooting', 'Geführter Anfragepfad', 'Karriereseite mit Kurzbewerbung'],
  bilder: [{}, {}, {}, {}],
};

const leer = (n: number): BildDaten[] => Array.from({ length: n }, () => ({}));
const raster6: Galerie = {
  label: 'Arbeiten',
  bilder: [
    { text: 'Website · Pflegedienst' },
    { text: 'Kampagne · Autohaus' },
    { text: 'Corporate Design · Kanzlei' },
    { text: 'Social Media · Gastronomie' },
    { text: 'Fotoshooting · Handwerk' },
    { text: 'Karriereseite · Industrie' },
  ],
};

const galerieLimits = { label: 24, 'bilder[].text': 40 };

export const loesungLayouts: LayoutDef[] = [
  {
    id: 'loesung-text',
    name: 'Lösung, Text und Headline',
    gruppe: 'Lösung',
    quelle: 'akoya-18',
    zweck: 'Lösung in einem Satz rechts, Erklärung und Leitprinzipien links.',
    komponente: LoesungTextL,
    beispiel: loesungText,
    limits: { label: 24, titel: 48, text: 160, zusatz: 100, punkteTitel: 30, 'punkte[]': 40 },
    anzahl: { punkte: [2, 4] },
  },
  {
    id: 'loesung-zickzack',
    name: 'Lösung im Zickzack',
    gruppe: 'Lösung',
    quelle: 'akoya-19',
    zweck: 'Zwei Kernsätze im Wechsel mit zwei Bildern.',
    komponente: ZickzackL,
    beispiel: zickzack,
    limits: { label: 24, oben: 64, unten: 64 },
    anzahl: { bilder: [0, 2] },
  },
  {
    id: 'loesung-verstreut',
    name: 'Lösung in drei Bildern',
    gruppe: 'Lösung',
    quelle: 'akoya-20',
    zweck: 'Drei Funktionen oder Schritte als lose verteilte Bilder mit Beschreibung.',
    komponente: VerstreutL,
    beispiel: verstreut,
    limits: { label: 24, 'schritte[].titel': 28, 'schritte[].text': 80 },
    anzahl: { schritte: [3, 3] },
  },
  {
    id: 'loesung-mitte',
    name: 'Lösung, Satz zwischen Bildern',
    gruppe: 'Lösung',
    quelle: 'akoya-21',
    zweck: 'Ein zentraler Satz, umgeben von vier kleinen Bildern mit Stichwort.',
    komponente: MitteL,
    beispiel: mitte,
    limits: { label: 24, satz: 64, 'bilder[].text': 24 },
    anzahl: { bilder: [0, 4] },
  },
  {
    id: 'loesung-bilder-text',
    name: 'Lösung, Bilder und großer Text',
    gruppe: 'Lösung',
    quelle: 'akoya-22',
    zweck: 'Zwei Bilder links, Nutzenversprechen mit Punkten rechts.',
    komponente: BilderTextL,
    beispiel: bilderText,
    limits: { label: 24, titel: 60, text: 110, 'punkte[]': 34, 'bilder[].text': 60 },
    anzahl: { punkte: [0, 3], bilder: [0, 2] },
  },
  {
    id: 'leistung-karten4',
    name: 'Leistung in vier Karten',
    gruppe: 'Leistung',
    quelle: 'akoya-23',
    zweck: 'Leistungsversprechen als Headline, darunter vier Bausteine mit Icon.',
    komponente: Karten4L,
    beispiel: karten4,
    limits: { label: 24, titel: 56, 'karten[].titel': 28, 'karten[].text': 90 },
    anzahl: { karten: [3, 4] },
  },
  {
    id: 'leistung-mosaik',
    name: 'Leistung mit Bildmosaik',
    gruppe: 'Leistung',
    quelle: 'akoya-24',
    zweck: 'Ein Projekt oder Produkt in Text links und vier Bildern rechts.',
    komponente: MosaikL,
    beispiel: mosaik,
    limits: { label: 24, titel: 48, text: 140, 'punkte[]': 40, 'bilder[].text': 40 },
    anzahl: { punkte: [0, 3], bilder: [0, 4] },
  },
  {
    id: 'leistung-bento8',
    name: 'Arbeiten, Bento mit acht Bildern',
    gruppe: 'Leistung',
    quelle: 'akoya-25',
    zweck: 'Acht Arbeiten in zwei Reihen mit wechselnder Breite.',
    komponente: Bento8L,
    beispiel: { label: 'Arbeiten', bilder: leer(8) },
    limits: galerieLimits,
    anzahl: { bilder: [0, 8] },
  },
  {
    id: 'leistung-bento53',
    name: 'Arbeiten, Bento fünf und drei',
    gruppe: 'Leistung',
    quelle: 'akoya-26',
    zweck: 'Fünf schmale Bilder oben, drei breite unten.',
    komponente: Bento53L,
    beispiel: { label: 'Arbeiten', bilder: leer(8) },
    limits: galerieLimits,
    anzahl: { bilder: [0, 8] },
  },
  {
    id: 'leistung-raster6',
    name: 'Arbeiten, Raster drei mal zwei',
    gruppe: 'Leistung',
    quelle: 'akoya-27',
    zweck: 'Sechs gleich große Arbeiten, optional mit Bildunterschrift.',
    komponente: Raster6L,
    beispiel: raster6,
    limits: galerieLimits,
    anzahl: { bilder: [0, 6] },
  },
  {
    id: 'leistung-masonry',
    name: 'Arbeiten, Vollbild-Mauerwerk',
    gruppe: 'Leistung',
    quelle: 'akoya-28',
    zweck: 'Bildwand über die ganze Folie, als Pause zwischen Kapiteln.',
    komponente: MasonryL,
    beispiel: { bilder: leer(13) },
    limits: galerieLimits,
    anzahl: { bilder: [0, 13] },
  },
];
