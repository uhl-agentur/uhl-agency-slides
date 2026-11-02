import React from 'react';
import { Box, C, Chip, Dash, Frame, Small, font, UhlBox } from '../infrabau-neuauftritt/ui';
import { facts, fazits, fields, fragen, groups, istRows, phases, quadrants, wbCols, wbRows } from './data';
import { search } from './search';

// Same look as the infrabau deck; content in data.ts and search.ts

export const TitleSlide: React.FC = () => (
  <div
    style={{
      ...font,
      width: 1920,
      height: 1080,
      background: C.black,
      color: '#FFFFFF',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 56,
    }}
  >
    <div style={{ position: 'absolute', top: 72, right: 80 }}>
      <UhlBox onDark />
    </div>
    <img src="/walcher/logo-white.png" alt="Architekturbüro Walcher" style={{ width: 560, height: 'auto' }} />
    <div style={{ fontSize: 34, letterSpacing: '0.06em', color: '#BDBDBD' }}>Neue Website · Stand und Richtung</div>
  </div>
);

const agenda = [
  ['01', 'Ausgangslage', 'Büro, Zielgruppen, Website, Suche, Wettbewerb'],
  ['02', 'Fazit', 'Was das für die neue Website heißt'],
  ['03', 'Roadmap', 'Fünf Phasen auf einen Blick'],
  ['04', 'Ideen', 'Was zusätzlich Mehrwert bringt'],
  ['05', 'Offene Fragen', 'Was wir mit Ihnen klären wollen'],
];

export const AgendaSlide: React.FC = () => (
  <Frame title="Agenda">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 44, paddingTop: 24 }}>
      {agenda.map(([n, t, d]) => (
        <div key={n} style={{ display: 'grid', gridTemplateColumns: '120px 560px 1fr', alignItems: 'baseline' }}>
          <span style={{ fontSize: 30, color: C.muted }}>{n}</span>
          <span style={{ fontSize: 36, fontWeight: 700 }}>{t}</span>
          <span style={{ fontSize: 26, color: C.muted }}>{d}</span>
        </div>
      ))}
    </div>
  </Frame>
);

const tileBg = [C.blue, C.yellow, C.tan, C.green];

export const BueroSlide: React.FC = () => (
  <Frame title="Das Büro heute" section="01 Ausgangslage">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
      {fields.map((f, i) => (
        <div key={f.t} style={{ background: tileBg[i], height: 300, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 32, fontWeight: 700 }}>{f.t}</span>
            <span style={{ fontSize: 40, fontWeight: 700 }}>{f.n}</span>
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.3 }}>{f.d}</div>
        </div>
      ))}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginTop: 72 }}>
      {facts.map(([n, l]) => (
        <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={{ fontSize: 72, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{n}</span>
          <span style={{ fontSize: 24, color: C.muted }}>{l}</span>
        </div>
      ))}
    </div>
    <Small style={{ marginTop: 'auto' }}>Zahl in der Kachel: Referenzen je Bereich auf der Website. Bewertungen laut werkenntdenBESTEN.</Small>
  </Frame>
);

export const ZielgruppenSlide: React.FC = () => (
  <Frame title="Zielgruppen" section="01 Ausgangslage">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, flex: 1 }}>
      {groups.map((g) => (
        <div key={g.t} style={{ border: `3px solid ${C.black}`, padding: '32px 30px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <span style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.15 }}>{g.t}</span>
          <span style={{ fontSize: 24, color: C.muted }}>{g.w}</span>
          <span style={{ fontSize: 26, lineHeight: 1.3, marginTop: 24 }}>Sucht: {g.s}</span>
          <span
            style={{
              alignSelf: 'flex-start',
              fontSize: 20,
              fontWeight: 700,
              padding: '6px 12px',
              border: `2px solid ${C.black}`,
              background: g.heute === 'fehlt' ? C.black : 'transparent',
              color: g.heute === 'fehlt' ? '#FFFFFF' : 'inherit',
            }}
          >
            Website heute: {g.heute}
          </span>
        </div>
      ))}
    </div>
  </Frame>
);

export const IstStandSlide: React.FC = () => (
  <Frame title="Die Website heute" section="01 Ausgangslage">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      {istRows.map(([k, s, v, d]) => (
        <div key={k} style={{ display: 'grid', gridTemplateColumns: '230px 360px 1fr', alignItems: 'center', columnGap: 24 }}>
          <Chip filled={v === 'filled'} light={v === 'light'}>{s}</Chip>
          <span style={{ fontSize: 30, fontWeight: 700 }}>{k}</span>
          <span style={{ fontSize: 28 }}>{d}</span>
        </div>
      ))}
    </div>
    <Small style={{ marginTop: 'auto' }}>Die Seite wurde im Sommer 2026 neu aufgesetzt (WordPress, Elementor).</Small>
  </Frame>
);

export const SucheSlide: React.FC = () => (
  <Frame title="Sichtbarkeit und Suchbegriffe" section="01 Ausgangslage">
    <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 64, flex: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span style={{ fontSize: 24, color: C.muted }}>Sichtbarkeitsindex</span>
        <span style={{ fontSize: 110, fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{search.visibility}</span>
        <span style={{ fontSize: 24, lineHeight: 1.35 }}>{search.visibilityNote}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <span style={{ fontSize: 24, color: C.muted }}>Google-Suchen pro Monat</span>
        {search.terms.map(([n, t, p]) => (
          <div key={t} style={{ display: 'grid', gridTemplateColumns: '170px 1fr 260px', alignItems: 'baseline', borderBottom: `1px solid ${C.line}`, paddingBottom: 12 }}>
            <span style={{ fontSize: 44, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{n}</span>
            <span style={{ fontSize: 28, fontWeight: 700 }}>„{t}“</span>
            <span style={{ fontSize: 22, color: C.muted }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
    <Box dark style={{ marginTop: 32, padding: '24px 32px' }}>
      <span style={{ fontSize: 30, fontWeight: 700 }}>{search.takeaway}</span>
    </Box>
    <Small style={{ marginTop: 14 }}>{search.source}</Small>
  </Frame>
);

const cell: React.CSSProperties = { padding: '14px 10px', textAlign: 'center', fontSize: 24 };
const mark = (x: number) => (x === 1 ? '●' : x === 0.5 ? '◐' : '·');

export const WettbewerbSlide: React.FC = () => (
  <Frame title="Wettbewerb im Vergleich" section="01 Ausgangslage">
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ background: C.black, color: '#FFFFFF' }}>
          <th style={{ ...cell, textAlign: 'left', fontSize: 20 }}>Funktion auf der Website</th>
          {wbCols.map((c) => (
            <th key={c} style={{ ...cell, fontSize: 19, width: 140, lineHeight: 1.2 }}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {wbRows.map(([label, v, only]) => (
          <tr key={label} style={{ borderBottom: `1px solid ${C.line}`, background: only ? C.light : undefined }}>
            <td style={{ ...cell, textAlign: 'left', fontWeight: only ? 700 : 400 }}>{label}</td>
            {v.map((x, i) => (
              <td key={i} style={{ ...cell, fontWeight: 700, color: x ? C.text : C.line }}>{mark(x)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <Small style={{ marginTop: 'auto' }}>● ja · ◐ teils · Grau hinterlegt: hat in der Region kein Büro vollständig.</Small>
  </Frame>
);

export const FazitSlide: React.FC = () => (
  <Frame title="Was das für die neue Website heißt" section="02 Fazit">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24, flex: 1 }}>
      {fazits.map((f, i) => (
        <Box key={f.short} dark={i < 3} style={{ justifyContent: 'space-between', padding: '26px 30px' }}>
          <span style={{ fontSize: 24, color: i < 3 ? '#BDBDBD' : C.muted }}>{String(i + 1).padStart(2, '0')}</span>
          <span style={{ fontSize: 31, fontWeight: 700, lineHeight: 1.15 }}>{f.short}</span>
        </Box>
      ))}
    </div>
  </Frame>
);

const overview = [
  ['Zielgruppen festlegen', 'Struktur planen', 'Suchbegriffe wählen'],
  ['Telefon sichtbar', 'Überschriften, Beschreibungen', 'Impressum, Profile'],
  ['Startseite mit Aussage', 'Bereiche je Zielgruppe', 'Steckbriefe, Anfrage'],
  ['Seiten für Suchbegriffe', 'Google-Profil', 'Bewertungen sammeln'],
  ['Wartung', 'Messen', 'Weiterentwickeln'],
];
const overviewOpt = [[], [], ['So arbeiten wir', 'Karriereseite'], ['Referenzmappe', 'Beiträge'], ['Social Media', 'Erstberatung online']];

export const RoadmapSlide: React.FC = () => (
  <Frame title="Roadmap" section="03 Roadmap · heute: erster Einstieg">
    <div style={{ display: 'grid', gridTemplateColumns: '150px repeat(5, 1fr)', gridTemplateRows: 'auto auto 1fr', columnGap: 20, rowGap: 16, flex: 1 }}>
      <span />
      {phases.map((p) => (
        <div key={p.n} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 20, color: C.muted }}>Phase {p.n}</span>
          <span style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.15 }}>{p.title}</span>
        </div>
      ))}
      <span style={{ fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center' }}>Pflicht</span>
      {overview.map((o, i) => (
        <Box key={i} dark style={{ padding: '18px 20px' }}>
          <Dash items={o} size={21} gap={8} />
        </Box>
      ))}
      <span style={{ fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center', color: C.muted }}>Optional</span>
      {overviewOpt.map((o, i) => (
        <div key={i} style={{ border: `2px dashed ${C.muted}`, padding: '18px 20px' }}>
          {o.length ? <Dash items={o} size={21} gap={8} color={C.muted} /> : null}
        </div>
      ))}
    </div>
    <Small style={{ marginTop: 18 }}>
      <b style={{ color: C.text }}>Alles aus einer Hand:</b> Grafik und Print, Web, SEO und Google Ads über einen Ansprechpartner.
    </Small>
  </Frame>
);

export const IdeenSlide: React.FC = () => (
  <Frame title="Ideen nach Nutzen und Aufwand" section="04 Ideen">
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
    <Small style={{ marginTop: 16 }}>Einordnung ist unsere Einschätzung.</Small>
  </Frame>
);

export const FragenSlide: React.FC = () => (
  <Frame title="Was wir mit Ihnen klären wollen" section="05 Offene Fragen">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
      {fragen.map((c) => (
        <div key={c.t} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <span style={{ fontSize: 32, fontWeight: 700 }}>{c.t}</span>
          <Dash items={c.q} size={27} gap={18} />
        </div>
      ))}
    </div>
  </Frame>
);

export const allWalcherWebsiteSlides: React.FC[] = [
  TitleSlide,
  AgendaSlide,
  BueroSlide,
  ZielgruppenSlide,
  IstStandSlide,
  SucheSlide,
  WettbewerbSlide,
  FazitSlide,
  RoadmapSlide,
  IdeenSlide,
  FragenSlide,
];
