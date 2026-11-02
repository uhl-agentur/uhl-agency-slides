import React from 'react';
import { Box, C, Dash, Frame, Small, font, UhlBox } from '../infrabau-neuauftritt/ui';
import {
  auffaellig, fragen, formate, gemacht, goodToKnow, jahr, kanaele, kanalPlan, monatlich,
  community, controlling, kpis, prinzipien, referenzen, regionFacts, team, vergleich, warumUhl, workshop,
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
    <img src="/donauries/logo.png" alt="DONAURIES" style={{ width: 400, height: 'auto' }} />
    <div style={{ fontSize: 34, letterSpacing: '0.06em', color: C.muted }}>Social Media ab 2027 · Ansatz und erste Ideen</div>
  </div>
);

const agenda = [
  ['01', 'Ausgangslage', 'Region, Kanäle, was uns auffällt'],
  ['02', 'Strategischer Ansatz', 'Prinzipien, Kanäle und Budget'],
  ['03', 'Erste Ideen', 'Formate, die Tourismus und Wirtschaft verbinden'],
  ['04', 'Zusammenarbeit', 'Ablauf, Erfolgsmessung, Team, Referenzen'],
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
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 56 }}>
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
        <Box key={a.t} style={{ justifyContent: 'flex-start', gap: 28 }}>
          <span style={{ fontSize: 22, color: C.muted }}>0{i + 1}</span>
          <span style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15 }}>{a.t}</span>
          <span style={{ fontSize: 27, lineHeight: 1.35 }}>{a.d}</span>
        </Box>
      ))}
    </div>
  </Frame>
);

export const AnsatzSlide: React.FC = () => (
  <Frame title="Unser Ansatz" section="02 Strategischer Ansatz">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
      {prinzipien.map((p, i) => (
        <Box key={p.t} style={{ gap: 16 }}>
          <span style={{ fontSize: 22, color: C.muted }}>0{i + 1}</span>
          <span style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.15 }}>{p.t}</span>
          <span style={{ fontSize: 28, lineHeight: 1.35 }}>{p.d}</span>
        </Box>
      ))}
    </div>
  </Frame>
);

export const KanalPlanSlide: React.FC = () => (
  <Frame title="Kanäle und Budget" section="02 Strategischer Ansatz">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, alignItems: 'stretch' }}>
      {kanalPlan.map((k) => (
        <Box key={k.t} style={{ gap: 28 }}>
          <span
            style={{
              alignSelf: 'flex-start', fontSize: 20, fontWeight: 700, padding: '6px 14px',
              border: `2px solid ${C.black}`,
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
      {goodToKnow.map((g) => (
        <Box key={g} style={{ justifyContent: 'center' }}>
          <span style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.3 }}>{g}</span>
        </Box>
      ))}
    </div>
  </Frame>
);

// Timeline: one marker per month with events, events as light cards below the line
export const JahrSlide: React.FC = () => (
  <Frame title="Das Jahr 2027" section="03 Erste Ideen">
    <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: `repeat(${jahr.length}, 1fr)`, gap: 28 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 95, height: 4, background: C.black }} />
      {jahr.map((j) => (
        <div key={j.m} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <span style={{ fontSize: 44, fontWeight: 700, height: 56 }}>{j.m}</span>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: C.black, border: '6px solid #FFFFFF', boxShadow: `0 0 0 3px ${C.black}`, position: 'relative' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {j.e.map((e) => (
              <div key={e} style={{ background: C.light, padding: '14px 18px', fontSize: 24, lineHeight: 1.3, fontWeight: 700 }}>{e}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 'auto' }}>
      <Dash
        size={26}
        gap={10}
        items={[
          <><b>Dazu das ganze Jahr:</b> Countdown zur Landesgartenschau Donauwörth 2028</>,
          <><b>Was geht im DONAURIES:</b> regelmäßiger Ausblick auf die nächsten Events</>,
        ]}
      />
      <Small style={{ marginTop: 18 }}>Termine teils voraussichtlich, Stand 02.11.2026.</Small>
    </div>
  </Frame>
);

export const AblaufSlide: React.FC = () => (
  <Frame title="So arbeiten wir" section="04 Zusammenarbeit">
    <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 40, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <span style={{ fontSize: 26, color: C.muted }}>Zum Start</span>
        <Box style={{ gap: 18 }}>
          <span style={{ fontSize: 40, fontWeight: 700 }}>{workshop.t}</span>
          <span style={{ fontSize: 26, color: C.muted }}>{workshop.s}</span>
          <Dash items={workshop.items} size={26} gap={12} />
        </Box>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <span style={{ fontSize: 26, color: C.muted }}>Jeden Monat</span>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${monatlich.length}, minmax(0, 1fr))`, gap: 16 }}>
          {monatlich.map((m, i) => (
            <div key={m.t} style={{ background: tileBg[i], padding: '28px 26px', minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 24 }}>0{i + 1}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ fontSize: 27, fontWeight: 700, lineHeight: 1.15, hyphens: 'auto' }} lang="de">{m.t}</span>
                <span style={{ fontSize: 22, lineHeight: 1.35 }}>{m.d}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Frame>
);

// Six portraits in one row (studio photos from the uhl website), captions below
export const TeamSlide: React.FC = () => {
  const cols = team.reduce((n, t) => n + t.img.length, 0);
  return (
    <Frame title="Das Team hinter Social Media" section="04 Zusammenarbeit">
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, columnGap: 16, rowGap: 24 }}>
        {team.flatMap((t) =>
          t.img.map((src) => (
            <img key={src} src={src} alt={t.n} style={{ width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', display: 'block' }} />
          )),
        )}
        {team.map((t) => (
          <div key={t.n} style={{ gridColumn: `span ${t.img.length}`, paddingTop: 4, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.1 }}>{t.n}</span>
            <span style={{ fontSize: 21, lineHeight: 1.3, whiteSpace: 'nowrap' }}>{t.r}</span>
            {t.d && <span style={{ fontSize: 22, color: C.muted }}>{t.d}</span>}
          </div>
        ))}
      </div>
      <Small style={{ marginTop: 'auto' }}>Daniel kommt aus Donauwörth, Karlheinz aus dem Ries.</Small>
    </Frame>
  );
};

export const ErfolgSlide: React.FC = () => (
  <Frame title="Erfolg messen & Community betreuen" section="04 Zusammenarbeit">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
      <Box style={{ gap: 24 }}>
        <span style={{ fontSize: 22, color: C.muted }}>KPIs</span>
        <span style={{ fontSize: 36, fontWeight: 700 }}>Was wir messen</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {kpis.map((k) => (
            <span key={k} style={{ fontSize: 24, fontWeight: 700, padding: '8px 14px', background: C.light }}>{k}</span>
          ))}
        </div>
      </Box>
      <Box style={{ gap: 24 }}>
        <span style={{ fontSize: 22, color: C.muted }}>Controlling</span>
        <span style={{ fontSize: 36, fontWeight: 700 }}>Jeden Monat auswerten</span>
        <Dash items={controlling} size={27} gap={14} />
      </Box>
      <Box style={{ gap: 24 }}>
        <span style={{ fontSize: 22, color: C.muted }}>Community-Management</span>
        <span style={{ fontSize: 36, fontWeight: 700 }}>Im Gespräch bleiben</span>
        <Dash items={community} size={27} gap={14} />
      </Box>
    </div>
  </Frame>
);

export const WarumUhlSlide: React.FC = () => (
  <Frame title="Warum Uhl" section="04 Zusammenarbeit">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
      {warumUhl.map((w, i) => (
        <Box key={w.t} style={{ gap: 16 }}>
          <span style={{ fontSize: 22, color: C.muted }}>0{i + 1}</span>
          <span style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.15 }}>{w.t}</span>
          <span style={{ fontSize: 28, lineHeight: 1.35 }}>{w.d}</span>
        </Box>
      ))}
    </div>
  </Frame>
);

export const ReferenzenSlide: React.FC = () => (
  <Frame title="Referenzen" section="04 Zusammenarbeit">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, alignItems: 'stretch' }}>
      {referenzen.map((r) => (
        <Box key={r.t} style={{ gap: 24 }}>
          <span style={{ fontSize: 22, color: C.muted }}>{r.s}</span>
          <span style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.15 }}>{r.t}</span>
          {r.d && <span style={{ fontSize: 28, lineHeight: 1.4, color: r.todo ? '#D62828' : undefined, fontWeight: r.todo ? 700 : 400 }}>{r.d}</span>}
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
  ErfolgSlide,
  TeamSlide,
  WarumUhlSlide,
  ReferenzenSlide,
  FragenSlide,
];
