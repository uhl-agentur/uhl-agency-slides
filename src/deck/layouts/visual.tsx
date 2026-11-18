import React from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { Folie, Liste, T } from '../system';
import { nr } from '../cx';
import type { LayoutDef } from '../typen';

/* Visualisations (S6, user F5 "mindmaps … andere visualisierte Darstellungen"): structure shown
   instead of listed. Mind map, funnel, loop, comparison, pyramid, parts of a whole.
   Connectors are SVG in a 0..100 viewBox stretched over their box (non-scaling strokes), so
   cards can sit at percentage positions without measuring. Track colour --spur like the
   timeline; the one lime element is the centre / key stage / own column. */

const kopfMax = { titel: 56, text: 140 };

/** headline (+ optional short text) above a visual */
function Kopf({ titel, text }: { titel: string; text?: string }) {
  return (
    <div className="stapel">
      <T stil="titel" as="h2" max={kopfMax.titel}>
        {titel}
      </T>
      <T stil="body" leise max={kopfMax.text}>
        {text}
      </T>
    </div>
  );
}

const linie = { fill: 'none', stroke: 'var(--spur)', strokeWidth: 4, vectorEffect: 'non-scaling-stroke' } as const;

function Verbinder({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
      {children}
    </svg>
  );
}

/* --------------------------------------------------------------- Mindmap --- */
interface Ast {
  titel: string;
  punkte?: string[];
}

interface MindmapRadial {
  label?: string;
  titel: string;
  zentrum: string;
  aeste: Ast[];
}

function AstKarte({ ast, style }: { ast: Ast; style?: React.CSSProperties }) {
  return (
    <div className="kachel" style={{ padding: 'var(--s2)', ...style }}>
      <T stil="karte" max={22}>
        {ast.titel}
      </T>
      {!!ast.punkte?.length && (
        <div className="stapel-s" style={{ marginTop: 'var(--s1)' }}>
          {ast.punkte.map((x, i) => (
            <T key={i} stil="meta" leise max={32}>
              {x}
            </T>
          ))}
        </div>
      )}
    </div>
  );
}

/* Topic in the middle (lime), branches left and right, curved connectors. 3-6 branches: the
   first half goes left, the rest right; each side spreads its cards evenly over the height. */
const MindmapRadialFolie: React.FC<MindmapRadial> = (p) => {
  const links = p.aeste.slice(0, Math.ceil(p.aeste.length / 2));
  const rechts = p.aeste.slice(links.length);
  const y = (i: number, n: number) => ((i + 0.5) / n) * 100;
  const KARTE = 30; // card width in % of the map
  const MITTE = 24; // centre tile width in %
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
        <Kopf titel={p.titel} />
        <div style={{ position: 'relative', flex: 1 }}>
          <Verbinder>
            {links.map((_, i) => (
              <path key={`l${i}`} {...linie} d={`M ${50 - MITTE / 2} 50 C ${KARTE + 4} 50, ${KARTE + 4} ${y(i, links.length)}, ${KARTE} ${y(i, links.length)}`} />
            ))}
            {rechts.map((_, i) => (
              <path key={`r${i}`} {...linie} d={`M ${50 + MITTE / 2} 50 C ${100 - KARTE - 4} 50, ${100 - KARTE - 4} ${y(i, rechts.length)}, ${100 - KARTE} ${y(i, rechts.length)}`} />
            ))}
          </Verbinder>
          <div className="kachel-akzent" style={{ position: 'absolute', left: `${50 - MITTE / 2}%`, width: `${MITTE}%`, top: '50%', transform: 'translateY(-50%)', padding: 'var(--s3) var(--s2)', textAlign: 'center' }}>
            <T stil="karte" max={28}>
              {p.zentrum}
            </T>
          </div>
          {links.map((a, i) => (
            <AstKarte key={`l${i}`} ast={a} style={{ position: 'absolute', left: 0, width: `${KARTE}%`, top: `${y(i, links.length)}%`, transform: 'translateY(-50%)' }} />
          ))}
          {rechts.map((a, i) => (
            <AstKarte key={`r${i}`} ast={a} style={{ position: 'absolute', right: 0, width: `${KARTE}%`, top: `${y(i, rechts.length)}%`, transform: 'translateY(-50%)' }} />
          ))}
        </div>
      </div>
    </Folie>
  );
};

interface MindmapBaum {
  label?: string;
  titel: string;
  wurzel: string;
  zweige: Ast[];
}

/* Root on top (lime), 2-5 branches in a row below, elbow connectors. Sitemap, offer structure. */
const MindmapBaumFolie: React.FC<MindmapBaum> = (p) => {
  const n = p.zweige.length;
  const g = (32 / 1776) * 100; // --gap in % of the content width
  const spalte = (100 - (n - 1) * g) / n;
  const mitten = p.zweige.map((_, i) => i * (spalte + g) + spalte / 2);
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
        <Kopf titel={p.titel} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="kachel-akzent" style={{ alignSelf: 'center', padding: 'var(--s2) var(--s3)', textAlign: 'center' }}>
            <T stil="karte" max={28}>
              {p.wurzel}
            </T>
          </div>
          <div style={{ position: 'relative', height: 'var(--s4)' }}>
            <Verbinder>
              <path {...linie} d={`M 50 0 V 50 M ${mitten[0]} 50 H ${mitten[n - 1]} ${mitten.map((x) => `M ${x} 50 V 100`).join(' ')}`} />
            </Verbinder>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, gap: 'var(--gap)' }}>
            {p.zweige.map((z, i) => (
              <div key={i} className="kachel" style={{ padding: 'var(--s2)' }}>
                <T stil="karte" max={18}>
                  {z.titel}
                </T>
                {!!z.punkte?.length && (
                  <div className="stapel-s" style={{ marginTop: 'var(--s2)' }}>
                    {z.punkte.map((x, j) => (
                      <T key={j} stil="meta" leise max={24}>
                        {x}
                      </T>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Folie>
  );
};

/* -------------------------------------------------------------- Trichter --- */
interface Stufe {
  name: string;
  wert: string;
  text?: string;
}

interface Trichter {
  label?: string;
  titel: string;
  text?: string;
  stufen: Stufe[];
  /** index of the key stage (lime) */
  schluessel?: number;
}

/** stage bars, widest on top; width in % of the funnel column */
const breiteVon = (i: number, n: number, schmal: number) => 100 - (i * (100 - schmal)) / Math.max(1, n - 1);

function TrichterBalken({ s, i, n, schluessel, schmal, children }: { s: Stufe; i: number; n: number; schluessel?: number; schmal: number; children?: React.ReactNode }) {
  const akzent = i === schluessel;
  return (
    <div
      style={{
        width: `${breiteVon(i, n, schmal)}%`,
        marginInline: 'auto',
        minHeight: 104,
        borderRadius: 'var(--r)',
        background: akzent ? 'var(--akzent)' : 'var(--balken)',
        color: akzent ? 'var(--akzent-text)' : 'var(--balken-text)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: 'var(--s2)',
        textAlign: 'center',
      }}
    >
      <T stil="karte" max={8} className="trim" style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
        {s.wert}
      </T>
      {children}
    </div>
  );
}

/* Headline on top; each stage = bar with its number, name and one line beside it. */
const TrichterBreit: React.FC<Trichter> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
      <Kopf titel={p.titel} text={p.text} />
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '880px minmax(0, 1fr)', columnGap: 'var(--s4)', rowGap: 8, alignContent: 'center', alignItems: 'center' }}>
        {p.stufen.map((s, i) => (
          <React.Fragment key={i}>
            <TrichterBalken s={s} i={i} n={p.stufen.length} schluessel={p.schluessel} schmal={36} />
            <div className="stapel-s">
              <T stil="karte" max={20}>
                {s.name}
              </T>
              <T stil="meta" leise max={60}>
                {s.text}
              </T>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </Folie>
);

/* 50/50: headline and text left, funnel right with number and name inside each bar. */
const TrichterGeteilt: React.FC<Trichter> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'var(--s4)', alignItems: 'center' }}>
      <Kopf titel={p.titel} text={p.text} />
      <div style={{ display: 'grid', gap: 8 }}>
        {p.stufen.map((s, i) => (
          <TrichterBalken key={i} s={s} i={i} n={p.stufen.length} schluessel={p.schluessel} schmal={50}>
            <T stil="meta" max={20}>
              {s.name}
            </T>
          </TrichterBalken>
        ))}
      </div>
    </div>
  </Folie>
);

/* ------------------------------------------------------------- Kreislauf --- */
interface Kreislauf {
  label?: string;
  titel: string;
  mitte: string;
  schritte: { titel: string; text?: string }[];
}

/* 3-6 steps on an ellipse around the centre (lime), first step on top, clockwise. Numbered:
   a loop has a real order (F3i). Ellipse radii leave room for the cards inside the box. */
const KreislaufFolie: React.FC<Kreislauf> = (p) => {
  const n = p.schritte.length;
  const RX = 38;
  const RY = 34;
  const ort = (i: number) => {
    const w = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { x: 50 + RX * Math.cos(w), y: 50 + RY * Math.sin(w) };
  };
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
        <Kopf titel={p.titel} />
        <div style={{ position: 'relative', flex: 1 }}>
          <Verbinder>
            <ellipse {...linie} cx={50} cy={50} rx={RX} ry={RY} />
          </Verbinder>
          <div className="kachel-akzent" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 360, padding: 'var(--s2)', textAlign: 'center' }}>
            <T stil="karte" max={24}>
              {p.mitte}
            </T>
          </div>
          {p.schritte.map((s, i) => {
            const o = ort(i);
            return (
              <div key={i} className="kachel" style={{ position: 'absolute', left: `${o.x}%`, top: `${o.y}%`, transform: 'translate(-50%, -50%)', width: 360, padding: 'var(--s2)' }}>
                <T stil="meta" leise>
                  {nr(i)}
                </T>
                <T stil="karte" max={18} style={{ marginTop: 'var(--s1)' }}>
                  {s.titel}
                </T>
                <T stil="meta" leise max={40} style={{ marginTop: 'var(--s1)' }}>
                  {s.text}
                </T>
              </div>
            );
          })}
        </div>
      </div>
    </Folie>
  );
};

/* -------------------------------------------------------------- Vergleich --- */
interface Seite {
  titel: string;
  punkte: string[];
}

interface VorherNachher {
  label?: string;
  titel: string;
  vorher: Seite;
  nachher: Seite;
}

/* Today in a grey card with crosses, tomorrow in the lime card with ticks, an arrow between. */
const VorherNachherFolie: React.FC<VorherNachher> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
      <Kopf titel={p.titel} />
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', gap: 'var(--gap)', alignItems: 'center' }}>
        <div className="kachel">
          <T stil="karte" max={24}>
            {p.vorher.titel}
          </T>
          <ul className="liste t-body" style={{ marginTop: 'var(--s3)' }}>
            {p.vorher.punkte.map((x, i) => (
              <li key={i}>
                <span className="liste-haken" aria-hidden>
                  <X strokeWidth={2.5} />
                </span>
                <T stil="body" as="span" leise max={40}>
                  {x}
                </T>
              </li>
            ))}
          </ul>
        </div>
        <div className="ikon" aria-hidden>
          <ArrowRight />
        </div>
        <div className="kachel-akzent">
          <T stil="karte" max={24}>
            {p.nachher.titel}
          </T>
          <div style={{ marginTop: 'var(--s3)' }}>
            <Liste punkte={p.nachher.punkte} max={40} />
          </div>
        </div>
      </div>
    </div>
  </Folie>
);

interface Tabelle {
  label?: string;
  titel: string;
  /** column heads, the first is the own offer (lime column) */
  spalten: string[];
  zeilen: { kriterium: string; werte: (boolean | string)[] }[];
}

function Zelle({ w }: { w: boolean | string }) {
  if (typeof w === 'string') return <T stil="meta" max={20}>{w}</T>;
  return w ? <Check size={36} strokeWidth={2.5} aria-label="ja" /> : <X size={36} strokeWidth={2.5} aria-label="nein" style={{ opacity: 0.55 }} />;
}

/* Criteria in rows, 2-3 offers in columns; the own column is a lime strip. */
const TabelleFolie: React.FC<Tabelle> = (p) => {
  const n = p.spalten.length;
  const zelle = (zeile: number, spalte: number, letzte: boolean): React.CSSProperties => ({
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center',
    padding: 'var(--s2)',
    minHeight: 80,
    background: spalte === 0 ? 'var(--akzent)' : undefined,
    color: spalte === 0 ? 'var(--akzent-text)' : undefined,
    borderRadius: spalte === 0 ? (zeile === -1 ? 'var(--r) var(--r) 0 0' : letzte ? '0 0 var(--r) var(--r)' : 0) : undefined,
  });
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
        <Kopf titel={p.titel} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: `minmax(0, 1.4fr) repeat(${n}, minmax(0, 1fr))`, columnGap: 'var(--gap)' }}>
            <div />
            {p.spalten.map((s, j) => (
              <div key={j} style={zelle(-1, j, false)}>
                <T stil="karte" max={18}>
                  {s}
                </T>
              </div>
            ))}
            {p.zeilen.map((z, i) => {
              const letzte = i === p.zeilen.length - 1;
              return (
                <React.Fragment key={i}>
                  <div className={letzte ? undefined : 'linie-unten'} style={{ display: 'flex', alignItems: 'center', padding: 'var(--s2) 0', minHeight: 80 }}>
                    <T stil="body" max={36}>
                      {z.kriterium}
                    </T>
                  </div>
                  {p.spalten.map((_, j) => (
                    <div key={j} style={zelle(i, j, letzte)}>
                      <Zelle w={z.werte[j] ?? false} />
                    </div>
                  ))}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </Folie>
  );
};

/* -------------------------------------------------------------- Pyramide --- */
interface Pyramide {
  label?: string;
  titel: string;
  /** top first: the top layer is the key (lime) */
  stufen: { titel: string; text?: string }[];
}

/* Truncated pyramid: each layer a trapezoid (clip-path, continuous slopes), title inside,
   explanation beside it on the same row. Top width 40 % keeps a title readable. */
const PyramideFolie: React.FC<Pyramide> = (p) => {
  const n = p.stufen.length;
  const b = (i: number) => 40 + (60 * i) / n; // width in % at a layer's top edge
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
        <Kopf titel={p.titel} />
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '880px minmax(0, 1fr)', columnGap: 'var(--s4)', rowGap: 8, alignContent: 'center', alignItems: 'center' }}>
          {p.stufen.map((s, i) => {
            const o = b(i);
            const u = b(i + 1);
            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    minHeight: 104,
                    display: 'grid',
                    placeItems: 'center',
                    textAlign: 'center',
                    padding: 'var(--s2) 22%',
                    background: i === 0 ? 'var(--akzent)' : 'var(--balken)',
                    color: i === 0 ? 'var(--akzent-text)' : 'var(--balken-text)',
                    clipPath: `polygon(${(100 - o) / 2}% 0, ${(100 + o) / 2}% 0, ${(100 + u) / 2}% 100%, ${(100 - u) / 2}% 100%)`,
                  }}
                >
                  <T stil="karte" max={18}>
                    {s.titel}
                  </T>
                </div>
                <T stil="body" leise max={70}>
                  {s.text}
                </T>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </Folie>
  );
};

/* --------------------------------------------------------------- Anteile --- */
interface Anteile {
  label?: string;
  titel: string;
  text?: string;
  teile: { name: string; wert: number; anzeige: string }[];
  /** index of the key part (lime) */
  schluessel?: number;
}

/* One whole as one bar (no pie: webdesign-rules pie-chart-problem). Parts alternate two grey
   levels, the key part is lime; value and name sit in each part's top corner. */
const AnteileFolie: React.FC<Anteile> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--s4)' }}>
      <Kopf titel={p.titel} text={p.text} />
      <div style={{ display: 'flex', gap: 8, height: 320 }}>
        {p.teile.map((t, i) => {
          const akzent = i === p.schluessel;
          return (
            <div
              key={i}
              style={{
                // ponytail: a small part keeps 220 px so its label fits; shares under ~12 % look larger than they are
                flex: `${t.wert} 1 0`,
                minWidth: 220,
                borderRadius: 'var(--r)',
                padding: 'var(--s2)',
                background: akzent ? 'var(--akzent)' : i % 2 ? 'var(--hoch)' : 'var(--balken)',
                color: akzent ? 'var(--akzent-text)' : i % 2 ? 'var(--text)' : 'var(--balken-text)',
              }}
            >
              <T stil="zahl-s" max={6} className="trim" style={{ whiteSpace: 'nowrap' }}>
                {t.anzeige}
              </T>
              <T stil="meta" max={20} style={{ marginTop: 'var(--s2)' }}>
                {t.name}
              </T>
            </div>
          );
        })}
      </div>
    </div>
  </Folie>
);

/* ---------------------------------------------------------------- Export --- */
const aeste: Ast[] = [
  { titel: 'Website', punkte: ['Leistungen mit Preisen', 'Online-Termin'] },
  { titel: 'Google', punkte: ['Profil mit Fotos', 'Bewertungen beantworten'] },
  { titel: 'Anzeigen', punkte: ['Suchanzeigen im Umkreis', 'Budget nach Saison'] },
  { titel: 'Social Media', punkte: ['Einblicke in den Betrieb', 'Stellenanzeigen'] },
  { titel: 'Empfehlungen', punkte: ['Bewertung nach Auftrag'] },
];

const stufen: Stufe[] = [
  { name: 'Besucher', wert: '4.200', text: 'kommen im Monat über Google und Anzeigen auf die Website.' },
  { name: 'Interessenten', wert: '380', text: 'sehen sich Leistungen und Preise genauer an.' },
  { name: 'Anfragen', wert: '64', text: 'füllen das Formular aus oder rufen an.' },
  { name: 'Aufträge', wert: '21', text: 'werden Kunden, ein Drittel der Anfragen.' },
];

export const visualLayouts: LayoutDef[] = [
  {
    familie: 'mindmap', variante: 'radial', name: 'Mindmap', art: 'diagramm',
    zweck: 'Ein Thema in der Mitte, drei bis sechs Äste mit Stichworten: Kanäle, Themenfelder, Ideen.',
    komponente: MindmapRadialFolie,
    beispiel: { label: 'Sichtbarkeit', titel: 'Fünf Wege, über die Kunden Sie finden', zentrum: 'Ihr Betrieb', aeste } satisfies MindmapRadial,
    limits: { label: 24, titel: 56, zentrum: 28, 'aeste[].titel': 22, 'aeste[].punkte[]': 32 },
    anzahl: { aeste: [3, 6] },
  },
  {
    familie: 'mindmap', variante: 'baum', name: 'Baum', art: 'diagramm',
    zweck: 'Oberbegriff oben, zwei bis fünf Zweige mit Unterpunkten: Sitemap, Angebotsstruktur.',
    komponente: MindmapBaumFolie,
    beispiel: {
      label: 'Website',
      titel: 'Eine Seite für jede Frage Ihrer Kunden',
      wurzel: 'Startseite',
      zweige: [
        { titel: 'Leistungen', punkte: ['Heizung', 'Sanitär', 'Badsanierung'] },
        { titel: 'Referenzen', punkte: ['Projekte mit Fotos', 'Kundenstimmen'] },
        { titel: 'Karriere', punkte: ['Offene Stellen', 'Ausbildung', 'Bewerbung in 2 Minuten'] },
        { titel: 'Über uns', punkte: ['Team', 'Geschichte'] },
        { titel: 'Kontakt', punkte: ['Online-Termin', 'Anfahrt'] },
      ],
    } satisfies MindmapBaum,
    limits: { label: 24, titel: 56, wurzel: 28, 'zweige[].titel': 18, 'zweige[].punkte[]': 24 },
    anzahl: { zweige: [2, 5] },
  },
  {
    familie: 'trichter', variante: 'breit', name: 'Trichter mit Erklärung', art: 'diagramm',
    zweck: 'Stufen, die schmaler werden (Besucher, Anfragen, Aufträge), mit einer Zeile je Stufe.',
    komponente: TrichterBreit,
    beispiel: { label: 'Ausgangslage', titel: 'Von 4.200 Besuchern werden 21 Kunden', stufen, schluessel: 3 } satisfies Trichter,
    limits: { label: 24, titel: 56, text: 140, 'stufen[].name': 20, 'stufen[].wert': 8, 'stufen[].text': 60 },
    anzahl: { stufen: [3, 5] },
  },
  {
    familie: 'trichter', variante: 'geteilt', name: 'Trichter neben Text', art: 'diagramm',
    zweck: 'Aussage und Einordnung links, der Trichter mit Zahl und Name je Stufe rechts.',
    komponente: TrichterGeteilt,
    beispiel: {
      label: 'Ausgangslage',
      titel: 'Die Lücke liegt zwischen Besuch und Anfrage',
      text: 'Neun von zehn Besuchern gehen, ohne sich zu melden. Genau dort setzt die neue Website an.',
      stufen,
      schluessel: 2,
    } satisfies Trichter,
    limits: { label: 24, titel: 56, text: 140, 'stufen[].name': 20, 'stufen[].wert': 8 },
    anzahl: { stufen: [3, 5] },
  },
  {
    familie: 'kreislauf', name: 'Kreislauf', art: 'diagramm',
    zweck: 'Schritte, die sich wiederholen: messen, lernen, verbessern. Drei bis sechs Stationen.',
    komponente: KreislaufFolie,
    beispiel: {
      label: 'Betreuung',
      titel: 'Jeden Monat ein Stück besser',
      mitte: '==Mehr Anfragen==',
      schritte: [
        { titel: 'Messen', text: 'Anfragen, Klicks und Kosten auswerten.' },
        { titel: 'Verstehen', text: 'Sehen, welche Seite und Anzeige wirkt.' },
        { titel: 'Verbessern', text: 'Texte, Bilder und Budget anpassen.' },
        { titel: 'Berichten', text: 'Ein Termin, eine Seite, klare Zahlen.' },
      ],
    } satisfies Kreislauf,
    limits: { label: 24, titel: 56, mitte: 24, 'schritte[].titel': 18, 'schritte[].text': 40 },
    anzahl: { schritte: [3, 6] },
  },
  {
    familie: 'vergleich', variante: 'vorher-nachher', name: 'Vorher und nachher', art: 'liste',
    zweck: 'Heute gegen künftig in zwei Karten, die neue Seite in Lime.',
    komponente: VorherNachherFolie,
    beispiel: {
      label: 'Ihr Nutzen',
      titel: 'Was sich für Ihre Kunden ändert',
      vorher: { titel: 'Heute', punkte: ['Preise nur auf Nachfrage', 'Termine nur am Telefon', 'Fotos von 2015'] },
      nachher: { titel: 'Mit der neuen Website', punkte: ['Preise auf jeder Leistungsseite', 'Termin online in 2 Minuten', 'Echte Fotos aus dem Betrieb'] },
    } satisfies VorherNachher,
    limits: { label: 24, titel: 56, 'vorher.titel': 24, 'vorher.punkte[]': 40, 'nachher.titel': 24, 'nachher.punkte[]': 40 },
  },
  {
    familie: 'vergleich', variante: 'tabelle', name: 'Vergleichstabelle', art: 'diagramm',
    zweck: 'Kriterien in Zeilen, zwei bis drei Wege in Spalten; der eigene Weg als Lime-Spalte.',
    komponente: TabelleFolie,
    beispiel: {
      label: 'Warum wir',
      titel: 'Drei Wege zu mehr Anfragen im Vergleich',
      spalten: ['Uhl', 'Große Agentur', 'Selbst machen'],
      zeilen: [
        { kriterium: 'Fester Ansprechpartner vor Ort', werte: [true, false, true] },
        { kriterium: 'Website & Anzeigen aus einer Hand', werte: [true, true, false] },
        { kriterium: 'Monatlich kündbar', werte: [true, false, true] },
        { kriterium: 'Zeitaufwand für Sie im Monat', werte: ['1 Stunde', '3 Stunden', '20 Stunden'] },
      ],
    } satisfies Tabelle,
    limits: { label: 24, titel: 56, 'spalten[]': 18, 'zeilen[].kriterium': 36 },
    anzahl: { spalten: [2, 3], zeilen: [3, 6] },
  },
  {
    familie: 'pyramide', name: 'Pyramide', art: 'diagramm',
    zweck: 'Ebenen, die aufeinander aufbauen: Markenhaus, Botschaften, Grundlage bis Ziel. Spitze in Lime.',
    komponente: PyramideFolie,
    beispiel: {
      label: 'Marke',
      titel: 'Jede Botschaft steht auf einem festen Fundament',
      stufen: [
        { titel: 'Versprechen', text: 'Ein Satz, den Kunden nach dem Termin weitererzählen.' },
        { titel: 'Beweise', text: '30 Jahre Meisterbetrieb, 400 Bewertungen mit 4,8 Sternen.' },
        { titel: 'Werte', text: 'Pünktlich, sauber, ehrlich beim Preis.' },
        { titel: 'Zielgruppe', text: 'Eigentümer im Umkreis von 30 km, die Ruhe statt Rabatt wollen.' },
      ],
    } satisfies Pyramide,
    limits: { label: 24, titel: 56, 'stufen[].titel': 18, 'stufen[].text': 70 },
    anzahl: { stufen: [3, 5] },
  },
  {
    familie: 'anteile', name: 'Anteile', art: 'zahl',
    zweck: 'Teile eines Ganzen als ein Balken: Budgetaufteilung, Herkunft der Anfragen. Zwei bis fünf Teile.',
    komponente: AnteileFolie,
    beispiel: {
      label: 'Budget',
      titel: 'So verteilt sich Ihr Monatsbudget',
      text: '2.500 € im Monat, ab dem vierten Monat nach Wirkung neu verteilt.',
      teile: [
        { name: 'Google-Anzeigen', wert: 45, anzeige: '45 %' },
        { name: 'Social-Anzeigen', wert: 25, anzeige: '25 %' },
        { name: 'Inhalte & Fotos', wert: 20, anzeige: '20 %' },
        { name: 'Auswertung', wert: 10, anzeige: '10 %' },
      ],
      schluessel: 0,
    } satisfies Anteile,
    limits: { label: 24, titel: 56, text: 140, 'teile[].name': 20, 'teile[].anzeige': 6 },
    anzahl: { teile: [2, 5] },
  },
];
