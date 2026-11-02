import React from 'react';
import { Box, C, Dash, Frame, Small, font, UhlBox } from '../infrabau-neuauftritt/ui';
import {
  ablauf, auffaellig, fragen, formate, gemacht, goodToKnow, jahr, kanaele, kanalPlan, leitidee, leitideeSub,
  prinzipien, referenzen, regionFacts, team, vergleich,
} from './data';

// Same look as the infrabau/walcher decks (Gesprächsgrundlage style); content in data.ts

const tileBg = [C.blue, C.yellow, C.tan, C.green, C.blue, C.yellow];

// Client logo is blue on white, so the title slide uses the white ground
export const TitleSlide: React.FC = () => (
  <div
    style={{
      ...font, width: 1920, height: 1080, background: '#FFFFFF', color: C.text, position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 56,
    }}
  >
    <div style={{ position: 'absolute', top: 72, right: 80 }}>
      <UhlBox />
    </div>
    <img src="/donauries/logo.png" alt="DONAURIES" style={{ width: 380, height: 'auto' }} />
    <div style={{ fontSize: 34, letterSpacing: '0.06em', color: C.muted }}>Social Media ab 2027 · Ansatz und erste Ideen</div>
  </div>
);

const agenda = [
  ['01', 'Ausgangslage', 'Region, Kanäle, was uns auffällt'],
  ['02', 'Strategischer Ansatz', 'Leitidee, Prinzipien, Kanäle'],
  ['03', 'Erste Ideen', 'Formate, die Tourismus und Wirtschaft verbinden'],
  ['04', 'Zusammenarbeit', 'Ablauf, Team, Referenzen'],
  ['05', 'Offene Fragen', 'Was wir mit Ihnen klären wollen'],
];

export const AgendaSlide: React.FC = () => (
  <Frame title="Agenda">
    <div style={{ display: 'flex', flexDirection: 'column', gap: 44, paddingTop: 24 }}>
      {agenda.map(([n, t, d]) => (
        <div key={n} style={{ display: 'grid', gridTemplateColumns: '120px 620px 1fr', alignItems: 'baseline' }}>
          <span style={{ fontSize: 30, color: C.muted }}>{n}</span>
          <span style={{ fontSize: 36, fontWeight: 700 }}>{t}</span>
          <span style={{ fontSize: 26, color: C.muted }}>{d}</span>
        </div>
      ))}
    </div>
  </Frame>
);

export const RegionSlide: React.FC = () => (
  <Frame title="Die Region" section="01 Ausgangslage">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 560px', gap: 64, flex: 1, minHeight: 0 }}>
      <img src="/donauries/karte.jpg" alt="Karte Landkreis Donau-Ries" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left center' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignContent: 'center', gap: '56px 32px' }}>
        {regionFacts.map(([n, l]) => (
          <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 72, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{n}</span>
            <span style={{ fontSize: 26, color: C.muted }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  </Frame>
);

export const KanaeleSlide: React.FC = () => (
  <Frame title="Die Kanäle heute" section="01 Ausgangslage">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
      {kanaele.map((k, i) => (
        <div key={k.k} style={{ background: tileBg[i], height: 250, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 32, fontWeight: 700 }}>{k.k}</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 80, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{k.n}</span>
            <span style={{ fontSize: 24 }}>{k.d}</span>
          </div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <span style={{ fontSize: 28, fontWeight: 700 }}>Instagram-Follower im Vergleich</span>
      {vergleich.map(([h, v, l]) => {
        const own = h === '@donauries.bayern';
        return (
          <div key={h} style={{ display: 'grid', gridTemplateColumns: '300px 1fr', alignItems: 'center', columnGap: 24 }}>
            <span style={{ fontSize: 24, fontWeight: own ? 700 : 400 }}>{h}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ height: 30, width: `${(v / 118) * 82}%`, minWidth: 6, background: own ? C.black : C.line }} />
              <span style={{ fontSize: 24, fontWeight: 700 }}>{l}</span>
            </div>
          </div>
        );
      })}
    </div>
    <Small style={{ marginTop: 'auto' }}>Stand 02.11.2026.</Small>
  </Frame>
);

export const AuffaelligSlide: React.FC = () => (
  <Frame title="Was uns auffällt" section="01 Ausgangslage">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, alignItems: 'stretch' }}>
      {auffaellig.map((a, i) => (
        <Box key={a.t} dark={i === 1} style={{ justifyContent: 'flex-start', gap: 28 }}>
          <span style={{ fontSize: 22, color: i === 1 ? '#BDBDBD' : C.muted }}>0{i + 1}</span>
          <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15 }}>{a.t}</span>
          <span style={{ fontSize: 27, lineHeight: 1.35 }}>{a.d}</span>
        </Box>
      ))}
    </div>
  </Frame>
);

export const AnsatzSlide: React.FC = () => (
  <Frame title="Unser Ansatz" section="02 Strategischer Ansatz">
    <Box dark style={{ padding: '40px 48px', gap: 14 }}>
      <span style={{ fontSize: 52, fontWeight: 700 }}>{leitidee}</span>
      <span style={{ fontSize: 30, color: '#D0D0D0' }}>{leitideeSub}</span>
    </Box>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginTop: 56 }}>
      {prinzipien.map((p, i) => (
        <div key={p.t} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontSize: 22, color: C.muted }}>0{i + 1}</span>
          <span style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.15 }}>{p.t}</span>
          <span style={{ fontSize: 26, lineHeight: 1.35 }}>{p.d}</span>
        </div>
      ))}
    </div>
  </Frame>
);

export const KanalPlanSlide: React.FC = () => (
  <Frame title="Kanäle und Budget" section="02 Strategischer Ansatz">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, alignItems: 'stretch' }}>
      {kanalPlan.map((k) => (
        <Box key={k.t} dark={k.dark} style={{ gap: 28 }}>
          <span
            style={{
              alignSelf: 'flex-start', fontSize: 20, fontWeight: 700, padding: '6px 14px',
              border: `2px solid ${k.dark ? '#FFFFFF' : C.black}`,
            }}
          >
            {k.s}
          </span>
          <span style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.15 }}>{k.t}</span>
          <span style={{ fontSize: 28, lineHeight: 1.35 }}>{k.d}</span>
        </Box>
      ))}
    </div>
  </Frame>
);

export const FormateSlide: React.FC = () => (
  <Frame title="Sechs Formate, eine Region" section="03 Erste Ideen">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr', gap: 28, flex: 1 }}>
      {formate.map((f, i) => (
        <div key={f.t} style={{ background: tileBg[i], padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 24 }}>0{i + 1}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.1 }}>{f.t}</span>
            <span style={{ fontSize: 25 }}>{f.d}</span>
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const GemachtSlide: React.FC = () => (
  <Frame title="Gemacht im DONAURIES" section="03 Erste Ideen">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <span style={{ fontSize: 34, lineHeight: 1.35 }}>
          Kurzdokus von 60 bis 90 Sekunden über Betriebe und Tätigkeiten, die man so nicht kennt. Arbeit wird sehenswert und zeigt nebenbei, wie es sich hier lebt.
        </span>
        <Small>Vorbild: der YouTube-Kanal „Handwerkskunst“.</Small>
      </div>
      <Box>
        <span style={{ fontSize: 28, fontWeight: 700 }}>Zum Beispiel</span>
        <Dash items={gemacht} size={28} gap={20} />
      </Box>
    </div>
  </Frame>
);

export const GoodToKnowSlide: React.FC = () => (
  <Frame title="Good-to-know" section="03 Erste Ideen">
    <span style={{ fontSize: 30, marginBottom: 40 }}>Kurze Fakten über die Region, vor Ort gedreht, Hook in den ersten zwei Sekunden.</span>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr', gap: 28, flex: 1 }}>
      {goodToKnow.map((g, i) => (
        <Box key={g} dark={i === 0} style={{ justifyContent: 'center' }}>
          <span style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.3 }}>{g}</span>
        </Box>
      ))}
    </div>
  </Frame>
);

export const JahrSlide: React.FC = () => (
  <Frame title="Das Jahr 2027" section="03 Erste Ideen">
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${jahr.length}, 1fr)`, gap: 24, borderTop: `3px solid ${C.black}`, paddingTop: 28 }}>
      {jahr.map((j) => (
        <div key={j.m} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontSize: 40, fontWeight: 700 }}>{j.m}</span>
          <Dash items={j.e} size={25} gap={10} />
        </div>
      ))}
    </div>
    <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      <Box dark style={{ gap: 12 }}>
        <span style={{ fontSize: 32, fontWeight: 700 }}>Countdown Landesgartenschau Donauwörth 2028</span>
        <span style={{ fontSize: 26 }}>Das ganze Jahr: Baustelle, Menschen dahinter, Vorfreude.</span>
      </Box>
      <Box style={{ gap: 12 }}>
        <span style={{ fontSize: 32, fontWeight: 700 }}>Was geht im DONAURIES</span>
        <span style={{ fontSize: 26 }}>Regelmäßiger Ausblick auf die nächsten Events.</span>
      </Box>
    </div>
    <Small style={{ marginTop: 20 }}>Termine teils voraussichtlich, Stand 02.11.2026.</Small>
  </Frame>
);

export const AblaufSlide: React.FC = () => (
  <Frame title="So arbeiten wir" section="04 Zusammenarbeit">
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${ablauf.length}, 1fr)`, gap: 28, paddingTop: 80 }}>
      {ablauf.map((a, i) => (
        <div key={a.n} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ height: 12, background: i === 0 ? C.black : C.line }} />
          <span style={{ fontSize: 26, color: C.muted }}>{a.n}</span>
          <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15 }}>{a.t}</span>
          <span style={{ fontSize: 28, lineHeight: 1.35 }}>{a.d}</span>
        </div>
      ))}
    </div>
  </Frame>
);

export const TeamSlide: React.FC = () => (
  <Frame title="Ihr Team" section="04 Zusammenarbeit">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
      {team.map((t, i) => (
        <div key={t.n} style={{ background: tileBg[i], height: 320, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 44, fontWeight: 700 }}>{t.n}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 26, fontWeight: 700 }}>{t.r}</span>
            {t.d && <span style={{ fontSize: 24 }}>{t.d}</span>}
          </div>
        </div>
      ))}
    </div>
    <Box dark style={{ marginTop: 56, padding: '32px 40px' }}>
      <span style={{ fontSize: 34, fontWeight: 700 }}>Aus der Region, für die Region: Wir drehen selbst vor Ort, regelmäßig und ohne Anfahrtstag.</span>
    </Box>
  </Frame>
);

export const ReferenzenSlide: React.FC = () => (
  <Frame title="Referenzen" section="04 Zusammenarbeit">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, alignItems: 'stretch' }}>
      {referenzen.map((r, i) => (
        <Box key={r.t} dark={i === 0} style={{ gap: 24 }}>
          <span style={{ fontSize: 22, color: i === 0 ? '#BDBDBD' : C.muted }}>{r.s}</span>
          <span style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.15 }}>{r.t}</span>
          {r.d && <span style={{ fontSize: 28, lineHeight: 1.4 }}>{r.d}</span>}
        </Box>
      ))}
    </div>
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

export const allDonauriesSlides: React.FC[] = [
  TitleSlide,
  AgendaSlide,
  RegionSlide,
  KanaeleSlide,
  AuffaelligSlide,
  AnsatzSlide,
  KanalPlanSlide,
  FormateSlide,
  GemachtSlide,
  GoodToKnowSlide,
  JahrSlide,
  AblaufSlide,
  TeamSlide,
  ReferenzenSlide,
  FragenSlide,
];
