import React from 'react';
import { Bild, BildDaten, Folie, Liste, T } from '../system';
import type { KennzahlDaten } from '../system';
import type { LayoutDef } from '../typen';
import { cx } from '../cx';
import { ArrowRight, ArrowUp, MoveRight, TrendingDown, TrendingUp } from 'lucide-react';

/* Strategy group: renders the output of the agency skills marketing-strategy
   (slide-checklist.json, slides 1-8) and pitch-prep (pitch outline), plus the
   open questions that collect every `FEHLT:` marker of a deck.
   Charts (scale, matrix, bars, line, traffic light) live here as small local
   components on purpose: plain HTML/SVG, colours only via theme roles. */

/* ================================================================ helpers === */

/** Traffic light mark. The label text always carries the meaning, the mark only repeats it:
    Fill only, no outline: gut = accent, mittel = hatched (F2b "die gestrichelten Varianten weiterhin nutzen"),
    schlecht = text colour. Distinct in both themes; the label carries the meaning in greyscale. */
type Stufe = 'gut' | 'mittel' | 'schlecht';

function AmpelMarke({ stufe, text }: { stufe: Stufe; text: string }) {
  const fill =
    stufe === 'gut' ? 'var(--akzent)' : stufe === 'mittel' ? 'repeating-linear-gradient(135deg, var(--text-2) 0 3px, transparent 3px 7px)' : 'var(--text)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <span
        style={{
          width: 32,
          height: 18,
          flex: 'none',
          borderRadius: 'var(--r-sm)',
          background: fill,
          /* the hatched mark keeps its outline so it reads as a box (F2d), the only outline in the system */
          boxShadow: stufe === 'mittel' ? 'inset 0 0 0 2px var(--text-2)' : undefined,
        }}
      />
      <span className="t-meta">{text}</span>
    </span>
  );
}

/** Five-step scale (market sophistication 1-5). The current step is lime, steps below solid. */
function Skala({ wert, stufen, klein }: { wert: number; stufen?: string[]; klein?: boolean }) {
  const w = Math.min(5, Math.max(1, Math.round(wert)));
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: klein ? 4 : 8 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            style={{
              height: klein ? 8 : 20,
              borderRadius: 'var(--r-sm)',
              background: n === w ? 'var(--akzent)' : n < w ? 'var(--balken)' : 'var(--linie)',
            }}
          />
          {!klein && (
            <span className={cx('t-meta', n !== w && 'leise')}>
              {n}
              {stufen?.[n - 1] ? ` ${stufen[n - 1]}` : ''}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function Pfeil({ richtung }: { richtung: 'wächst' | 'stabil' | 'schrumpft' }) {
  const Ikon = richtung === 'wächst' ? TrendingUp : richtung === 'schrumpft' ? TrendingDown : MoveRight;
  return <Ikon size={32} strokeWidth={2} aria-hidden />;
}

const nr = (i: number) => String(i + 1).padStart(2, '0');
const zahl = (n: number) => n.toLocaleString('de-DE');

/* ================================================== 1 strategie-kernsatz === */
interface Kernsatz {
  label?: string;
  kunde: string;
  logo?: BildDaten;
  satz: string;
  stuetzen?: string[];
}

const KernsatzFolie: React.FC<Kernsatz> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className="stapel-l">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s2)' }}>
          <Bild bild={p.logo} platzhalter="Logo" unterschrift={false} style={{ width: 120, height: 56 }} />
          <T stil="meta" leise max={64}>{`Marketingstrategie für ${p.kunde}`}</T>
        </div>
        <T stil="display" as="h1" max={48}>
          {p.satz}
        </T>
      </div>
      {!!p.stuetzen?.length && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap)' }}>
          {p.stuetzen.map((s, i) => (
            <T key={i} stil="body" leise max={96}>
              {s}
            </T>
          ))}
        </div>
      )}
    </div>
  </Folie>
);

/* ===================================================== SWOT (shared) === */
interface Swot {
  staerken: string[];
  schwaechen: string[];
  chancen: string[];
  risiken: string[];
}
const swotFelder: { key: keyof Swot; buchstabe: string; name: string }[] = [
  { key: 'staerken', buchstabe: 'S', name: 'Stärken' },
  { key: 'schwaechen', buchstabe: 'W', name: 'Schwächen' },
  { key: 'chancen', buchstabe: 'O', name: 'Chancen' },
  { key: 'risiken', buchstabe: 'T', name: 'Risiken' },
];

/* ================================================= 2 strategie-marktbild === */
interface Marktbild {
  label?: string;
  titel: string;
  sophistication: number;
  stufen?: string[];
  nachfrage: 'wächst' | 'stabil' | 'schrumpft';
  nachfrageText?: string;
  text: string;
  fazit: string;
  /** not rendered any more (feedback F1 "zu viel inhalt"): the SWOT gets its own slide, strategie-swot */
  swot?: Swot;
}

const MarktbildFolie: React.FC<Marktbild> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--s3)' }}>
        <div className="stapel-l">
          <T stil="titel" as="h2" max={44}>
            {p.titel}
          </T>
          <T stil="body" leise max={150}>
            {p.text}
          </T>
        </div>
        <T stil="karte" max={80}>
          {p.fazit}
        </T>
      </div>
      <div className="stapel-l" style={{ alignSelf: 'center' }}>
        <div className="stapel">
          <span className="t-meta leise">Market Sophistication</span>
          <Skala wert={p.sophistication} stufen={p.stufen} />
        </div>
        <div className="stapel">
          <span className="t-meta leise">Nachfrage</span>
          <span className="t-karte" style={{ display: 'flex', alignItems: 'center', gap: 'var(--s1)' }}>
            <Pfeil richtung={p.nachfrage} />
            {p.nachfrageText ?? p.nachfrage}
          </span>
        </div>
      </div>
    </div>
  </Folie>
);

/* ===================================================== 3 strategie-swot === */
interface SwotVoll extends Swot {
  label?: string;
  titel: string;
}

const SwotFolie: React.FC<SwotVoll> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
      <T stil="titel" as="h2" max={44}>
        {p.titel}
      </T>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 'var(--gap)' }}>
        {swotFelder.map((f) => (
          <div key={f.key} className="kachel stapel">
            <p className="t-karte">{f.name}</p>
            <Liste punkte={p[f.key]} max={40} />
          </div>
        ))}
      </div>
    </div>
  </Folie>
);

/* =============================================== 4 strategie-wettbewerb === */
interface Wettbewerb {
  label?: string;
  titel: string;
  wettbewerber: { name: string; typ?: string; merkmal: string }[];
  luecke: string;
  punkte?: string[];
}

const WettbewerbFolie: React.FC<Wettbewerb> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--s3)' }}>
        <T stil="titel" as="h2" max={44}>
          {p.titel}
        </T>
        <ul>
          {p.wettbewerber.map((w, i) => (
            <li key={i} className="linie-unten" style={{ display: 'grid', gridTemplateColumns: '5fr 6fr', gap: 'var(--gap)', padding: '22px 0' }}>
              <div className="stapel-s">
                <T stil="karte" max={28}>
                  {w.name}
                </T>
                <T stil="meta" leise max={36}>
                  {w.typ}
                </T>
              </div>
              <T stil="body" max={70}>
                {w.merkmal}
              </T>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="kachel-akzent"
        style={{ display: 'flex', flexDirection: 'column', justifyContent: p.punkte?.length ? 'space-between' : 'center' }}
      >
        <div className="stapel">
          <p className="t-meta leise">Die Lücke</p>
          <T stil="titel" max={80}>
            {p.luecke}
          </T>
        </div>
        <Liste punkte={p.punkte} max={60} />
      </div>
    </div>
  </Folie>
);

/* ================================================== 5 strategie-matrix === */
interface Punkt {
  name: string;
  /** 0-100 from left to right */
  x: number;
  /** 0-100 from bottom to top */
  y: number;
}
interface Matrix {
  label?: string;
  titel: string;
  text?: string;
  achseX: { minus: string; plus: string };
  achseY: { minus: string; plus: string };
  anbieter: Punkt[];
  wir: Punkt;
}

function PunktMarke({ p, wir }: { p: Punkt; wir?: boolean }) {
  const rechts = p.x > 72;
  const g = wir ? 28 : 16;
  return (
    <div
      style={{
        position: 'absolute',
        left: `${p.x}%`,
        bottom: `${p.y}%`,
        transform: 'translate(-50%, 50%)',
        display: 'flex',
        flexDirection: rechts ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: 12,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: g, height: g, flex: 'none', borderRadius: 'var(--r-sm)', background: wir ? 'var(--akzent)' : 'var(--text)' }} />
      {/* label and marker share one centre line: absolute label, centred on the marker, line-height 1 */}
      <span
        className={wir ? 't-karte' : 't-meta'}
        style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', lineHeight: 1, whiteSpace: 'nowrap', [rechts ? 'right' : 'left']: g + 12 }}
      >
        {p.name}
      </span>
    </div>
  );
}

const MatrixFolie: React.FC<Matrix> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
      <div className="stapel" style={{ alignSelf: 'center' }}>
        <T stil="titel" as="h2" max={44}>
          {p.titel}
        </T>
        <T stil="body" leise max={150}>
          {p.text}
        </T>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr auto', gap: 'var(--s2)' }}>
        <div style={{ position: 'relative' }}>
          {/* axes as filled bars, not borders */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'var(--text)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: 'var(--text)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'var(--linie)' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--linie)' }} />
          <span className="t-meta leise" style={{ position: 'absolute', left: 'var(--s2)', top: 0, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <ArrowUp size={18} aria-hidden />
            {p.achseY.plus}
          </span>
          <span className="t-meta leise" style={{ position: 'absolute', left: 'var(--s2)', bottom: 'var(--s1)' }}>
            {p.achseY.minus}
          </span>
          <div style={{ position: 'absolute', inset: '48px 64px 48px 48px' }}>
            {p.anbieter.map((a, i) => (
              <PunktMarke key={i} p={a} />
            ))}
            <PunktMarke p={p.wir} wir />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="t-meta leise">{p.achseX.minus}</span>
          <span className="t-meta leise" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {p.achseX.plus}
            <ArrowRight size={18} aria-hidden />
          </span>
        </div>
      </div>
    </div>
  </Folie>
);

/* ================================================ 6 strategie-personas === */
interface Persona {
  name: string;
  segment?: string;
  sophistication?: number;
  ausloeser: string;
  wunsch: string;
  schmerz: string;
  einwand: string;
  ton: string;
}
interface Personas {
  label?: string;
  titel: string;
  personas: Persona[];
}
const personaZeilen: { key: keyof Persona; name: string }[] = [
  { key: 'ausloeser', name: 'Auslöser' },
  { key: 'wunsch', name: 'Wunsch' },
  { key: 'schmerz', name: 'Schmerz' },
  { key: 'einwand', name: 'Einwand' },
  { key: 'ton', name: 'Tonalität' },
];

const PersonasFolie: React.FC<Personas> = (p) => {
  const spalten = `200px repeat(${p.personas.length}, 1fr)`;
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
        <T stil="titel" as="h2" max={44}>
          {p.titel}
        </T>
        <div>
          <div className="linie-unten" style={{ display: 'grid', gridTemplateColumns: spalten, columnGap: 'var(--gap)', paddingBottom: 'var(--s2)' }}>
            <span />
            {p.personas.map((x, i) => (
              <div key={i} className="stapel-s">
                <T stil="karte" max={22}>
                  {x.name}
                </T>
                <T stil="meta" leise max={30}>
                  {x.segment}
                </T>
                {x.sophistication !== undefined && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 96 }}>
                      <Skala wert={x.sophistication} klein />
                    </div>
                    <span className="t-meta leise">{`Sophistication ${x.sophistication}/5`}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {personaZeilen.map((z) => (
            <div key={z.key} className="linie-unten" style={{ display: 'grid', gridTemplateColumns: spalten, columnGap: 'var(--gap)', padding: '16px 0' }}>
              <span className="t-meta leise" style={{ paddingTop: 4 }}>
                {z.name}
              </span>
              {p.personas.map((x, i) => (
                <T key={i} stil="body" max={30}>
                  {String(x[z.key] ?? '')}
                </T>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Folie>
  );
};

/* ================================================= 7 strategie-journey === */
interface Journey {
  label?: string;
  titel: string;
  persona?: string;
  phasen: { name: string; kontakt: string; beduerfnis: string }[];
  /** index of the decisive stage, drawn in lime */
  schluessel?: number;
}

const JourneyFolie: React.FC<Journey> = (p) => {
  const spalten = `180px repeat(${p.phasen.length}, 1fr)`;
  const zeile = (name: string, feld: 'kontakt' | 'beduerfnis', max: number) => (
    <div style={{ display: 'grid', gridTemplateColumns: spalten, columnGap: 'var(--s2)' }}>
      <span className="t-meta leise">{name}</span>
      {p.phasen.map((ph, i) => (
        <T key={i} stil="body" max={max}>
          {ph[feld]}
        </T>
      ))}
    </div>
  );
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className="stapel">
          <T stil="titel" as="h2" max={44}>
            {p.titel}
          </T>
          <T stil="meta" leise max={60}>
            {p.persona}
          </T>
        </div>
        <div className="stapel-l">
          <div style={{ display: 'grid', gridTemplateColumns: spalten, columnGap: 'var(--s2)', rowGap: 'var(--s2)', alignItems: 'end' }}>
            <span />
            {p.phasen.map((ph, i) => (
              <div key={i} className="stapel-s">
                <span className="t-meta leise">{nr(i)}</span>
                <T stil="karte" max={16}>
                  {ph.name}
                </T>
              </div>
            ))}
            <span />
            {p.phasen.map((_, i) => (
              <div key={i} style={{ height: 8, borderRadius: 'var(--r-sm)', background: i === p.schluessel ? 'var(--akzent)' : 'var(--text)' }} />
            ))}
          </div>
          {zeile('Kontaktpunkt', 'kontakt', 36)}
          {zeile('Bedürfnis', 'beduerfnis', 56)}
        </div>
      </div>
    </Folie>
  );
};

/* ============================================== 8 strategie-unternehmen === */
interface Unternehmen {
  label?: string;
  usp: string;
  kernbotschaft: string;
  saeulen: { titel: string; text: string }[];
  /** not rendered (feedback F1 "zu überladen"): trust numbers belong on beweis-kennzahlen3 */
  trust?: KennzahlDaten[];
  /** not rendered, see trust */
  richtung?: string;
  /** not rendered, see trust */
  mood?: BildDaten[];
}

const UnternehmenFolie: React.FC<Unternehmen> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className="stapel" style={{ maxWidth: 1240 }}>
        <T stil="aussage" as="h2" max={56}>
          {p.kernbotschaft}
        </T>
        <T stil="lead" leise max={80}>
          {p.usp}
        </T>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${p.saeulen.length}, 1fr)`, gap: 'var(--gap)' }}>
        {p.saeulen.map((s, i) => (
          <div key={i} className="kachel stapel-s">
            <T stil="karte" max={24}>
              {s.titel}
            </T>
            <T stil="body" leise max={64}>
              {s.text}
            </T>
          </div>
        ))}
      </div>
    </div>
  </Folie>
);

/* ================================================ 9 strategie-kanalmix === */
const kanalAmpel: Record<Stufe, string> = { gut: 'stark', mittel: 'Baustelle', schlecht: 'fehlt' };

interface Kanalmix {
  label?: string;
  titel: string;
  bereiche: { name: string; stufe: Stufe; befund: string; baseline?: string }[];
}

const KanalmixFolie: React.FC<Kanalmix> = (p) => {
  const spalten = '280px 200px 1fr 300px';
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
        <T stil="titel" as="h2" max={44}>
          {p.titel}
        </T>
        <div>
          <div className="linie-unten" style={{ display: 'grid', gridTemplateColumns: spalten, columnGap: 'var(--gap)', paddingBottom: 'var(--s1)' }}>
            <span className="t-meta leise">Bereich</span>
            <span className="t-meta leise">Ampel</span>
            <span className="t-meta leise">Ist-Zustand</span>
            <span className="t-meta leise">Baseline</span>
          </div>
          {p.bereiche.map((b, i) => (
            <div key={i} className="linie-unten" style={{ display: 'grid', gridTemplateColumns: spalten, columnGap: 'var(--gap)', alignItems: 'center', padding: '18px 0' }}>
              <T stil="karte" max={18}>
                {b.name}
              </T>
              <AmpelMarke stufe={b.stufe} text={kanalAmpel[b.stufe]} />
              <T stil="body" max={68}>
                {b.befund}
              </T>
              <T stil="body" leise max={24}>
                {b.baseline}
              </T>
            </div>
          ))}
        </div>
      </div>
    </Folie>
  );
};

/* ===================================================== 10 strategie-kpi === */
const kpiAmpel: Record<Stufe, string> = { gut: 'Growth', mittel: 'Baseline', schlecht: 'ausgeschlossen' };

interface Kpi {
  label?: string;
  titel: string;
  zeilen: { bereich: string; stufe: Stufe; kennzahl: string; von: string; bis: string }[];
  fussnote: string;
}

const KpiFolie: React.FC<Kpi> = (p) => {
  const spalten = '280px 220px 1fr 200px 48px 200px';
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div className="stapel-l">
          <T stil="titel" as="h2" max={44}>
            {p.titel}
          </T>
          <div>
            <div className="linie-unten" style={{ display: 'grid', gridTemplateColumns: spalten, columnGap: 'var(--s2)', paddingBottom: 'var(--s1)' }}>
              <span className="t-meta leise">Bereich</span>
              <span className="t-meta leise">Ampel</span>
              <span className="t-meta leise">Kennzahl</span>
              <span className="t-meta leise">Heute</span>
              <span />
              <span className="t-meta leise">Ziel</span>
            </div>
            {p.zeilen.map((z, i) => (
              <div key={i} className="linie-unten" style={{ display: 'grid', gridTemplateColumns: spalten, columnGap: 'var(--s2)', alignItems: 'center', padding: '20px 0' }}>
                <T stil="karte" max={18}>
                  {z.bereich}
                </T>
                <AmpelMarke stufe={z.stufe} text={kpiAmpel[z.stufe]} />
                <T stil="body" leise max={40}>
                  {z.kennzahl}
                </T>
                <T stil="karte" className={z.stufe === 'schlecht' ? 'leise' : undefined} max={10}>
                  {z.von}
                </T>
                <ArrowRight size={24} className="leise" aria-hidden />
                <T stil="karte" className={z.stufe === 'schlecht' ? 'leise' : undefined} max={10}>
                  {z.bis}
                </T>
              </div>
            ))}
          </div>
        </div>
        <T stil="meta" leise max={120}>
          {p.fussnote}
        </T>
      </div>
    </Folie>
  );
};

/* ================================================= 11 strategie-roadmap === */
interface Stage {
  zeitraum: string;
  titel: string;
  punkte: string[];
}
interface Roadmap {
  label?: string;
  titel: string;
  fundament: Stage;
  betreuung: Stage;
  meilensteine: { zeit: string; kpi: string }[];
}

const RoadmapFolie: React.FC<Roadmap> = (p) => {
  const stage = (s: Stage, akzent: boolean, kinder?: React.ReactNode) => (
    <div className="stapel" style={{ display: 'flex', flexDirection: 'column' }}>
      <T stil="meta" leise max={24}>
        {s.zeitraum}
      </T>
      <div style={{ height: 8, borderRadius: 'var(--r-sm)', background: akzent ? 'var(--akzent)' : 'var(--text)' }} />
      <T stil="karte" max={28}>
        {s.titel}
      </T>
      <Liste punkte={s.punkte} max={34} />
      {kinder}
    </div>
  );
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
        <T stil="titel" as="h2" max={44}>
          {p.titel}
        </T>
        <div style={{ display: 'grid', gridTemplateColumns: '4fr 8fr', gap: 'var(--gap)' }}>
          {stage(p.fundament, false)}
          {stage(
            p.betreuung,
            true,
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${p.meilensteine.length}, 1fr)`, gap: 'var(--gap)', marginTop: 'var(--s3)' }}>
              {p.meilensteine.map((m, i) => (
                <div key={i} className="kachel stapel-s" style={{ padding: 'var(--s2)' }}>
                  <T stil="meta" leise max={20}>
                    {m.zeit}
                  </T>
                  <T stil="body" max={44}>
                    {m.kpi}
                  </T>
                </div>
              ))}
            </div>,
          )}
        </div>
      </div>
    </Folie>
  );
};

/* ================================================== 12 strategie-balken === */
interface Balken {
  label?: string;
  titel: string;
  text?: string;
  quelle?: string;
  balken: { label: string; wert: number; anzeige?: string }[];
  /** index of the highlighted bar; default: the largest */
  hervor?: number;
}

const BalkenFolie: React.FC<Balken> = (p) => {
  const max = Math.max(...p.balken.map((b) => b.wert), 1);
  const hervor = p.hervor ?? p.balken.findIndex((b) => b.wert === max);
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--s3)' }}>
          <div className="stapel">
            <T stil="titel" as="h2" max={44}>
              {p.titel}
            </T>
            <T stil="body" leise max={150}>
              {p.text}
            </T>
          </div>
          <T stil="meta" leise max={80}>
            {p.quelle}
          </T>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--s2)' }}>
          {p.balken.map((b, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 'var(--s2)', alignItems: 'center' }}>
              <T stil="body" className={i === hervor ? undefined : 'leise'} max={26}>
                {b.label}
              </T>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s2)' }}>
                <div
                  style={{
                    height: 40,
                    width: `calc((100% - 160px) * ${b.wert / max})`,
                    minWidth: 4,
                    borderRadius: 'var(--r-sm)',
                    background: i === hervor ? 'var(--akzent)' : 'var(--linie)',
                  }}
                />
                <span className={cx(i === hervor ? 't-karte' : 't-body leise')} style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                  {b.anzeige ?? zahl(b.wert)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Folie>
  );
};

/* =================================================== 13 strategie-linie === */
interface Linie {
  label?: string;
  titel: string;
  text?: string;
  quelle?: string;
  achse: string[];
  reihen: { name: string; werte: number[] }[];
  /** index of the highlighted series, default 0 */
  hervor?: number;
}

function schritt(max: number) {
  const roh = max / 4;
  const pot = 10 ** Math.floor(Math.log10(roh));
  const n = roh / pot;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * pot;
}

const LinieFolie: React.FC<Linie> = (p) => {
  const hervor = p.hervor ?? 0;
  const roh = Math.max(...p.reihen.flatMap((r) => r.werte), 1);
  const st = schritt(roh);
  const oben = Math.ceil(roh / st) * st;
  const ticks = Array.from({ length: Math.round(oben / st) + 1 }, (_, i) => i * st);
  const n = p.achse.length;
  const x = (i: number) => (n > 1 ? (i / (n - 1)) * 1000 : 500);
  const y = (v: number) => 400 - (v / oben) * 400;
  const pfad = (w: number[]) => w.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
  const reihenfolge = p.reihen.map((_, i) => i).sort((a, b) => (a === hervor ? 1 : b === hervor ? -1 : 0));
  const h = p.reihen[hervor];
  const letzter = h ? h.werte[h.werte.length - 1] : 0;
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--s3)' }}>
          <div className="stapel">
            <T stil="titel" as="h2" max={44}>
              {p.titel}
            </T>
            <T stil="body" leise max={150}>
              {p.text}
            </T>
          </div>
          <div className="stapel">
            <div className="stapel-s">
              {p.reihen.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 32, height: i === hervor ? 6 : 2, borderRadius: 2, background: i === hervor ? 'var(--akzent)' : 'var(--text-2)' }} />
                  <span className={cx('t-meta', i !== hervor && 'leise')}>{r.name}</span>
                </div>
              ))}
            </div>
            <T stil="meta" leise max={80}>
              {p.quelle}
            </T>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gridTemplateRows: '1fr auto', columnGap: 'var(--s2)', rowGap: 'var(--s1)', paddingTop: 'var(--s3)' }}>
          <div style={{ position: 'relative' }}>
            {ticks.map((t) => (
              <span key={t} className="t-meta leise" style={{ position: 'absolute', right: 0, bottom: `${(t / oben) * 100}%`, transform: 'translateY(50%)', fontVariantNumeric: 'tabular-nums' }}>
                {zahl(t)}
              </span>
            ))}
          </div>
          <div style={{ position: 'relative' }}>
            {ticks.map((t) => (
              <div key={t} style={{ position: 'absolute', left: 0, right: 0, bottom: `${(t / oben) * 100}%`, height: 1, background: 'var(--linie)' }} />
            ))}
            <svg viewBox="0 0 1000 400" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden>
              {reihenfolge.map((i) => (
                <path
                  key={i}
                  d={pfad(p.reihen[i].werte)}
                  fill="none"
                  stroke={i === hervor ? 'var(--akzent)' : 'var(--text-2)'}
                  strokeWidth={i === hervor ? 6 : 2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            {h && (
              <span className="t-karte" style={{ position: 'absolute', right: 0, bottom: `calc(${(letzter / oben) * 100}% + 20px)`, fontVariantNumeric: 'tabular-nums' }}>
                {zahl(letzter)}
              </span>
            )}
          </div>
          <span />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {p.achse.map((a, i) => (
              <span key={i} className="t-meta leise" style={{ width: 0, display: 'flex', justifyContent: i === 0 ? 'flex-start' : i === n - 1 ? 'flex-end' : 'center', whiteSpace: 'nowrap' }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Folie>
  );
};

/* ======================================================= 14 pitch-case === */
interface PitchCase {
  label?: string;
  kunde: string;
  branche?: string;
  logo?: BildDaten;
  titel: string;
  herausforderung: string;
  loesung: string;
  ergebnisse: KennzahlDaten[];
  bild?: BildDaten;
}

const PitchCaseFolie: React.FC<PitchCase> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--s3)' }}>
        <div className="stapel-l">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s2)' }}>
            <Bild bild={p.logo} platzhalter="Logo" unterschrift={false} style={{ width: 120, height: 56 }} />
            <T stil="meta" leise max={60}>
              {[p.kunde, p.branche].filter(Boolean).join(' · ')}
            </T>
          </div>
          <T stil="titel" as="h2" max={60}>
            {p.titel}
          </T>
          <div className="stapel">
            <div className="stapel-s">
              <p className="t-meta leise">Herausforderung</p>
              <T stil="body" max={100}>
                {p.herausforderung}
              </T>
            </div>
            <div className="stapel-s">
              <p className="t-meta leise">Was wir gemacht haben</p>
              <T stil="body" max={100}>
                {p.loesung}
              </T>
            </div>
          </div>
        </div>
        {/* stats sized by their content with one fixed gap: the space between them is equal (F3d) */}
        <div style={{ display: 'flex', gap: 'var(--s4)' }}>
          {p.ergebnisse.map((k, i) => (
            <div key={i} className="stapel-s" style={{ flex: '0 1 auto', maxWidth: '12em' }}>
              <T stil="titel" max={6} style={{ whiteSpace: 'nowrap' }}>
                {k.wert}
              </T>
              <T stil="meta" leise max={44}>
                {k.text}
              </T>
            </div>
          ))}
        </div>
      </div>
      <Bild bild={p.bild} platzhalter="Projektbild" style={{ height: '100%' }} />
    </div>
  </Folie>
);

/* ===================================================== 15 pitch-pakete === */
interface Pakete {
  label?: string;
  titel: string;
  pakete: { name: string; fuer?: string; preis: string; einheit?: string; punkte: string[]; empfohlen?: boolean }[];
}

const PaketeFolie: React.FC<Pakete> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
      <T stil="titel" as="h2" max={44}>
        {p.titel}
      </T>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: `repeat(${p.pakete.length}, 1fr)`, gap: 'var(--gap)' }}>
        {p.pakete.map((k, i) => (
          <div
            key={i}
            className={k.empfohlen ? 'kachel-akzent' : 'kachel'}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div className="stapel">
              <div className="stapel-s">
                <T stil="karte" max={24}>
                  {k.name}
                </T>
                <T stil="meta" leise max={48}>
                  {k.fuer}
                </T>
              </div>
              <Liste punkte={k.punkte} max={36} />
            </div>
            <div className="stapel-s">
              <T stil="titel" max={14}>
                {k.preis}
              </T>
              <T stil="meta" leise max={36}>
                {k.einheit}
              </T>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Folie>
);

/* ===================================================== 16 offene-fragen === */
interface OffeneFragen {
  label?: string;
  titel: string;
  text?: string;
  fragen: { frage: string; wer: string; zu?: string }[];
}

const OffeneFragenFolie: React.FC<OffeneFragen> = (p) => (
  <Folie label={p.label}>
    {/* both columns centred vertically (F3c) */}
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)', alignItems: 'center' }}>
      <div className="stapel">
        <T stil="titel" as="h2" max={44}>
          {p.titel}
        </T>
        <T stil="body" leise max={140}>
          {p.text}
        </T>
      </div>
      <ol style={{ alignSelf: 'center' }}>
        {p.fragen.map((f, i) => (
          <li key={i} className="linie-unten" style={{ display: 'grid', gridTemplateColumns: '56px 1fr 260px', gap: 'var(--s2)', alignItems: 'center', padding: '20px 0' }}>
            <span className="t-meta leise" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {nr(i)}
            </span>
            <T stil="body" max={90}>
              {f.frage}
            </T>
            <div className="stapel-s">
              <T stil="meta" max={28}>
                {f.wer}
              </T>
              <T stil="meta" leise max={28}>
                {f.zu}
              </T>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </Folie>
);

/* ========================================================== beispiele === */
const swotBeispiel: Swot = {
  staerken: ['Feste Bezugspflege je Familie', '4,9 Sterne aus 112 Bewertungen', 'Erreichbar rund um die Uhr'],
  schwaechen: ['Website ohne Leistungsseiten', 'Kaum Fotos vom echten Team', 'Keine Online-Anfrage'],
  chancen: ['Mehr Pflegebedürftige im Landkreis', 'Angehörige suchen zuerst online', 'Wenig lokale Inhalte bei Google'],
  risiken: ['Fachkräftemangel bremst Wachstum', 'Ketten mit großen Werbebudgets', 'Neue Tagespflege in Rain'],
};

const kernsatz: Kernsatz = {
  label: 'Kick-off',
  kunde: 'Donauries Pflegedienst',
  satz: 'Bei Donauries pflegt ein ==festes Gesicht==.',
  stuetzen: [
    'Jede Familie hat eine feste Pflegekraft und eine direkte Nummer.',
    'Wir sind in 30 Minuten vor Ort, von Donauwörth bis Rain.',
    'Angehörige sehen nach jedem Einsatz, was gemacht wurde.',
  ],
};

const marktbild: Marktbild = {
  label: 'Marktbild',
  titel: 'Ein reifer Markt, der weiter wächst',
  sophistication: 3,
  stufen: ['Neu', 'Versprechen', 'Methode', 'Wettlauf', 'Vertrauen'],
  nachfrage: 'wächst',
  text: 'Im Landkreis steigt die Zahl der Pflegebedürftigen jedes Jahr. Fast alle Dienste versprechen Herz und Erfahrung.',
  fazit: 'Nicht lauter versprechen, sondern den Ablauf der Pflege zeigen.',
};

const swotVoll: SwotVoll = { label: 'Marktbild', titel: 'Wo Donauries heute steht', ...swotBeispiel };

const wettbewerb: Wettbewerb = {
  label: 'Wettbewerb',
  titel: 'Welche Lücke wir füllen',
  wettbewerber: [
    { name: 'Sozialstation Donauwörth', typ: 'lokal · kirchlicher Träger', merkmal: 'Bekannt in der Region, Website seit Jahren unverändert' },
    { name: 'Pflegeteam Ries', typ: 'lokal · privat', merkmal: 'Stark auf Google Maps, aber keine Inhalte zu Leistungen' },
    { name: 'CareMobil', typ: 'national · Kette', merkmal: 'Große Ads-Budgets, wechselndes Personal vor Ort' },
    { name: 'Hausnotruf Schwaben', typ: 'regional · Spezialist', merkmal: 'Nur Notruf, keine Pflege, sehr präsent bei Social' },
  ],
  luecke: 'Keiner zeigt, wer konkret zur Familie kommt.',
  punkte: ['Feste Bezugspflege mit Gesicht und Namen', 'Anfrage in zwei Minuten online', 'Transparenz nach jedem Einsatz'],
};

const matrix: Matrix = {
  label: 'Wettbewerb',
  titel: 'Persönlich und sichtbar zugleich',
  text: 'Die Anbieter in der Region sind entweder nah an der Familie oder gut online auffindbar. Beides zusammen bietet noch keiner.',
  achseX: { minus: 'wechselndes Personal', plus: 'feste Bezugspflege' },
  achseY: { minus: 'online kaum sichtbar', plus: 'online gut sichtbar' },
  anbieter: [
    { name: 'CareMobil', x: 18, y: 84 },
    { name: 'Hausnotruf Schwaben', x: 30, y: 62 },
    { name: 'Sozialstation Donauwörth', x: 62, y: 22 },
    { name: 'Pflegeteam Ries', x: 40, y: 40 },
    { name: 'Pflege Rain', x: 22, y: 12 },
  ],
  wir: { name: 'Donauries', x: 86, y: 80 },
};

const personas: Personas = {
  label: 'Zielgruppen',
  titel: 'Wer bei uns anfragt',
  personas: [
    { name: 'Die Tochter', segment: 'Angehörige, 45 bis 60', sophistication: 3, ausloeser: 'Sturz der Mutter', wunsch: 'Entlastung im Alltag', schmerz: 'Kein Überblick, wenig Zeit', einwand: 'Fremde im Elternhaus', ton: 'Klar, ruhig, verbindlich' },
    { name: 'Der Senior', segment: 'Selbst Betroffene, 75 plus', sophistication: 2, ausloeser: 'Arztbrief nach Klinik', wunsch: 'Zuhause bleiben können', schmerz: 'Angst vor Abhängigkeit', einwand: 'Ich schaffe das allein', ton: 'Respektvoll, langsam' },
    { name: 'Die Sozialdienste', segment: 'Kliniken und Hausärzte', sophistication: 4, ausloeser: 'Entlassung steht an', wunsch: 'Schnelle Zusage', schmerz: 'Dienste ohne Kapazität', einwand: 'Erreichbarkeit unklar', ton: 'Knapp, fachlich' },
  ],
};

const journey: Journey = {
  label: 'Zielgruppen',
  titel: 'Der Weg der Tochter zur Anfrage',
  persona: 'Persona: Die Tochter, Angehörige zwischen 45 und 60',
  schluessel: 3,
  phasen: [
    { name: 'Auslöser', kontakt: 'Arzt oder Klinik', beduerfnis: 'Verstehen, was jetzt auf sie zukommt' },
    { name: 'Suche', kontakt: 'Google und Maps', beduerfnis: 'Dienste in der Nähe mit freien Plätzen' },
    { name: 'Vergleich', kontakt: 'Website und Bewertungen', beduerfnis: 'Sehen, wer zur Mutter kommt' },
    { name: 'Anfrage', kontakt: 'Formular oder Anruf', beduerfnis: 'Schnelle, verbindliche Rückmeldung' },
    { name: 'Erstgespräch', kontakt: 'Hausbesuch', beduerfnis: 'Kosten und Ablauf verstehen' },
    { name: 'Bindung', kontakt: 'Pflege-App, Telefon', beduerfnis: 'Wissen, was gemacht wurde' },
  ],
};

const unternehmen: Unternehmen = {
  label: 'Unternehmen',
  kernbotschaft: 'Pflege, bei der Sie wissen, ==wer kommt==.',
  usp: 'Feste Bezugspflege für jede Familie, mit direkter Nummer und Bericht.',
  saeulen: [
    { titel: 'Feste Gesichter', text: 'Eine Pflegekraft und ein Name für die ganze Familie.' },
    { titel: 'Schnell vor Ort', text: 'In 30 Minuten im ganzen Landkreis, auch am Wochenende.' },
    { titel: 'Alles nachvollziehbar', text: 'Angehörige sehen nach jedem Einsatz, was gemacht wurde.' },
  ],
};

const kanalmix: Kanalmix = {
  label: 'Ist-Analyse',
  titel: 'Wo die Kanäle heute stehen',
  bereiche: [
    { name: 'Website', stufe: 'mittel', befund: 'Solide Basis, aber keine Leistungsseiten und kein Anfrageformular', baseline: '6 Anfragen pro Monat' },
    { name: 'SEO lokal', stufe: 'gut', befund: 'Google-Profil gepflegt, Einträge in Portalen fast überall gleich', baseline: 'Platz 3 in Maps' },
    { name: 'Social Media', stufe: 'mittel', befund: 'Facebook unregelmäßig, Instagram ohne Beiträge seit 2025', baseline: '340 Follower' },
    { name: 'Paid Ads', stufe: 'schlecht', befund: 'Keine Anzeigen, Wettbewerber belegen die Top-Plätze', baseline: 'keine Daten' },
    { name: 'Branding', stufe: 'gut', befund: 'Logo und Farben klar, werden überall gleich eingesetzt', baseline: 'Logo von 2019' },
    { name: 'Foto & Video', stufe: 'schlecht', befund: 'Nur Stockfotos, kein Bild vom echten Team', baseline: '0 eigene Bilder' },
  ],
};

const kpi: Kpi = {
  label: 'Kanalmix',
  titel: 'Was wir in einem Jahr erreichen wollen',
  zeilen: [
    { bereich: 'Website', stufe: 'gut', kennzahl: 'Anfragen pro Monat', von: '6', bis: '20' },
    { bereich: 'SEO lokal', stufe: 'gut', kennzahl: 'Platz in Google Maps', von: '3', bis: '1' },
    { bereich: 'Paid Ads', stufe: 'mittel', kennzahl: 'Kosten pro Anfrage', von: 'offen', bis: '45 €' },
    { bereich: 'Social Media', stufe: 'mittel', kennzahl: 'Bewerbungen pro Quartal', von: '2', bis: '8' },
    { bereich: 'Print', stufe: 'schlecht', kennzahl: 'kein Ziel, bewusst ausgeschlossen', von: '–', bis: '–' },
  ],
  fussnote: 'Gilt bei vollumfänglicher Umsetzung und einem Jahr Betreuung. Annahme, keine Garantie.',
};

const roadmap: Roadmap = {
  label: 'Roadmap',
  titel: 'Erst das Fundament, dann Wachstum',
  fundament: { zeitraum: 'Monat 1 bis 3', titel: 'Fundament', punkte: ['Design auffrischen', 'Brand Guide', 'Website mit Leistungsseiten', 'Local SEO Pack'] },
  betreuung: { zeitraum: 'ab Monat 4, laufend', titel: 'Betreuung', punkte: ['Google Ads auf Leistungen', 'Social Media fürs Recruiting', 'Ratgeber für Angehörige'] },
  meilensteine: [
    { zeit: 'Monat 4', kpi: 'Erste Anfragen über Google Ads' },
    { zeit: 'Monat 6', kpi: '12 Anfragen pro Monat' },
    { zeit: 'Monat 12', kpi: '20 Anfragen, Platz 1 in Maps' },
  ],
};

const balken: Balken = {
  label: 'Marktbild',
  titel: 'Wonach in der Region gesucht wird',
  text: 'Monatliche Suchanfragen im Landkreis Donau-Ries. Die Suche nach einem Dienst in der Nähe ist mit Abstand am größten.',
  quelle: 'Quelle: Sistrix, Suchvolumen Oktober 2026',
  balken: [
    { label: 'ambulanter Pflegedienst', wert: 1900 },
    { label: 'Pflegedienst in der Nähe', wert: 2400 },
    { label: 'Pflegegrad beantragen', wert: 1300 },
    { label: 'Verhinderungspflege', wert: 880 },
    { label: 'Tagespflege', wert: 720 },
    { label: 'Hausnotruf', wert: 590 },
  ],
};

const linie: Linie = {
  label: 'Marktbild',
  titel: 'Die Nachfrage wächst stetig',
  text: 'Suchanfragen nach Pflege in der Region in den letzten zwölf Monaten, im Vergleich zum stärksten Wettbewerber.',
  quelle: 'Quelle: Sistrix, Nov. 2025 bis Okt. 2026',
  achse: ['Nov', 'Dez', 'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt'],
  reihen: [
    { name: 'Suchen nach Pflegedienst', werte: [1480, 1520, 1710, 1650, 1690, 1760, 1720, 1800, 1830, 1880, 1950, 2040] },
    { name: 'Sichtbarkeit CareMobil', werte: [900, 920, 980, 1010, 990, 1040, 1080, 1060, 1100, 1120, 1150, 1170] },
  ],
};

const pitchCase: PitchCase = {
  label: 'Referenz',
  kunde: 'Holzbau Wertach',
  branche: 'Handwerk, Augsburg',
  titel: 'Vom Empfehlungsbetrieb zu planbaren Anfragen',
  herausforderung: 'Aufträge kamen nur über Empfehlungen. Die Website war alt und brachte kaum Anfragen.',
  loesung: 'Neue Website mit Leistungsseiten, Local SEO und Google Ads auf Dachsanierung.',
  ergebnisse: [
    { wert: '+180 %', text: 'Anfragen über die Website im ersten Jahr' },
    { wert: 'Nr. 1', text: 'in Google Maps für Zimmerei Augsburg' },
    { wert: '38 €', text: 'Kosten pro Anfrage über Ads' },
  ],
};

const pakete: Pakete = {
  label: 'Investition',
  titel: 'Drei Wege, mit uns zu starten',
  pakete: [
    { name: 'Fundament', fuer: 'Für einen sauberen Neustart', preis: 'ab 8.400 €', einheit: 'einmalig', punkte: ['Strategie-Workshop', 'Website mit 8 Seiten', 'Local SEO Pack', 'Fotoshooting Team'] },
    { name: 'Wachstum', fuer: 'Fundament plus laufende Anfragen', preis: 'ab 1.450 €', einheit: 'pro Monat, 12 Monate', punkte: ['Alles aus Fundament', 'Google Ads Betreuung', 'Zwei Ratgeber pro Monat', 'Monatliches Reporting', 'Fester Ansprechpartner'], empfohlen: true },
    { name: 'Sichtbarkeit', fuer: 'Wenn die Website schon steht', preis: 'ab 690 €', einheit: 'pro Monat', punkte: ['Google Ads Betreuung', 'Local SEO laufend', 'Quartalsgespräch'] },
  ],
};

const offeneFragen: OffeneFragen = {
  label: 'Nächste Schritte',
  titel: 'Was wir noch von Ihnen brauchen',
  text: 'Diese Punkte konnten wir nicht recherchieren. Mit Ihren Antworten wird die Strategie vollständig.',
  fragen: [
    { frage: 'Wie viel Marge bleibt Ihnen im Schnitt pro neuem Pflegekunden?', wer: 'Geschäftsführung', zu: 'Paid Ads' },
    { frage: 'Welche Zertifikate und Prüfnoten dürfen wir zeigen?', wer: 'Pflegedienstleitung', zu: 'Unternehmen' },
    { frage: 'Gibt es Zugang zu Google Analytics oder der Search Console?', wer: 'IT-Dienstleister', zu: 'Ist-Analyse' },
    { frage: 'Wie viele neue Kunden können Sie pro Monat aufnehmen?', wer: 'Pflegedienstleitung', zu: 'Kanalmix' },
    { frage: 'Hängt Ihr Team am heutigen Logo, oder ist es offen?', wer: 'Geschäftsführung', zu: 'Branding' },
  ],
};

/* ============================================================ registry === */
const q = 'agentur';

export const strategieLayouts: LayoutDef[] = [
  {
    id: 'strategie-kernsatz', name: 'Strategie-Kernsatz', gruppe: 'Strategie', quelle: q,
    zweck: 'marketing-strategy Slide 1 Kick-off: Präsens-Kernsatz, Stützsätze, Marketingstrategie für Kunde.',
    komponente: KernsatzFolie, beispiel: kernsatz,
    limits: { label: 24, kunde: 40, satz: 48, 'stuetzen[]': 96 }, anzahl: { stuetzen: [0, 3] },
  },
  {
    id: 'strategie-marktbild', name: 'Marktbild mit Skala', gruppe: 'Strategie', quelle: q,
    zweck: 'marketing-strategy Slide 2 Marktbild: Sophistication 1-5, Nachfrage-Richtung, ein kurzer Absatz, Fazit. SWOT auf eigener Folie (strategie-swot).',
    komponente: MarktbildFolie, beispiel: marktbild,
    limits: { label: 24, titel: 44, 'stufen[]': 18, nachfrageText: 14, text: 150, fazit: 80 },
    anzahl: { stufen: [5, 5] },
  },
  {
    id: 'strategie-swot', name: 'SWOT ganzseitig', gruppe: 'Strategie', quelle: q,
    zweck: 'marketing-strategy Slide 2 Element swot, wenn es eine eigene Folie braucht.',
    komponente: SwotFolie, beispiel: swotVoll,
    limits: { label: 24, titel: 44, 'staerken[]': 40, 'schwaechen[]': 40, 'chancen[]': 40, 'risiken[]': 40 },
    anzahl: { staerken: [2, 4], schwaechen: [2, 4], chancen: [2, 4], risiken: [2, 4] },
  },
  {
    id: 'strategie-wettbewerb', name: 'Wettbewerb und Lücke', gruppe: 'Strategie', quelle: q,
    zweck: 'marketing-strategy Slide 3 Konkurrenz: Wettbewerber-Zeilen, Lücke als Payoff, Differenzierung.',
    komponente: WettbewerbFolie, beispiel: wettbewerb,
    limits: { label: 24, titel: 44, 'wettbewerber[].name': 28, 'wettbewerber[].typ': 36, 'wettbewerber[].merkmal': 70, luecke: 80, 'punkte[]': 60 },
    anzahl: { wettbewerber: [2, 4], punkte: [0, 3] },
  },
  {
    id: 'strategie-matrix', name: 'Positionierungs-Matrix', gruppe: 'Strategie', quelle: q,
    zweck: 'marketing-strategy Slide 3 Konkurrenz: Positionierungs-Matrix mit zwei ehrlichen Achsen.',
    komponente: MatrixFolie, beispiel: matrix,
    limits: { label: 24, titel: 44, text: 150, 'achseX.minus': 26, 'achseX.plus': 26, 'achseY.minus': 26, 'achseY.plus': 26, 'anbieter[].name': 24, 'wir.name': 18 },
    anzahl: { anbieter: [3, 7] },
  },
  {
    id: 'strategie-personas', name: 'Persona-Vergleich', gruppe: 'Strategie', quelle: q,
    zweck: 'marketing-strategy Slide 4 Persona: Segment, Sophistication, Trigger, Desire, Pain, Objection, Tonalität.',
    komponente: PersonasFolie, beispiel: personas,
    limits: { label: 24, titel: 44, 'personas[].name': 22, 'personas[].segment': 30, 'personas[].ausloeser': 30, 'personas[].wunsch': 30, 'personas[].schmerz': 30, 'personas[].einwand': 30, 'personas[].ton': 30 },
    anzahl: { personas: [2, 4] },
  },
  {
    id: 'strategie-journey', name: 'User Journey', gruppe: 'Strategie', quelle: q,
    zweck: 'marketing-strategy Slide 4 Element user_journey: Phasen mit Kontaktpunkt und Bedürfnis.',
    komponente: JourneyFolie, beispiel: journey,
    limits: { label: 24, titel: 44, persona: 60, 'phasen[].name': 16, 'phasen[].kontakt': 36, 'phasen[].beduerfnis': 56 },
    anzahl: { phasen: [3, 6] },
  },
  {
    id: 'strategie-unternehmen', name: 'Unternehmen: USP und Botschaft', gruppe: 'Strategie', quelle: q,
    zweck: 'marketing-strategy Slide 5 Unternehmen: Kernbotschaft, USP, drei Messaging-Säulen. Trust-Zahlen auf beweis-kennzahlen3.',
    komponente: UnternehmenFolie, beispiel: unternehmen,
    limits: { label: 24, kernbotschaft: 56, usp: 80, 'saeulen[].titel': 24, 'saeulen[].text': 64 },
    anzahl: { saeulen: [2, 3] },
  },
  {
    id: 'strategie-kanalmix', name: 'Ist-Analyse Kanalmix', gruppe: 'Strategie', quelle: q,
    zweck: 'marketing-strategy Slide 6 Ist-Analyse Kanal-Mix: je Domain Ampel, Ist-Zustand, Baseline.',
    komponente: KanalmixFolie, beispiel: kanalmix,
    limits: { label: 24, titel: 44, 'bereiche[].name': 18, 'bereiche[].befund': 68, 'bereiche[].baseline': 24 },
    anzahl: { bereiche: [3, 6] },
  },
  {
    id: 'strategie-kpi', name: 'Kanalmix-Recap mit KPI', gruppe: 'Strategie', quelle: q,
    zweck: 'marketing-strategy Slide 7 Kanal-Mix-Recap: Domain, Ampel, Baseline-KPI zu Ziel-KPI, Annahme-Fußnote.',
    komponente: KpiFolie, beispiel: kpi,
    limits: { label: 24, titel: 44, 'zeilen[].bereich': 18, 'zeilen[].kennzahl': 40, 'zeilen[].von': 10, 'zeilen[].bis': 10, fussnote: 120 },
    anzahl: { zeilen: [3, 7] },
  },
  {
    id: 'strategie-roadmap', name: 'Roadmap in zwei Stufen', gruppe: 'Strategie', quelle: q,
    zweck: 'marketing-strategy Slide 8 Roadmap: Fundament, dann Betreuung mit KPI-Meilensteinen und Zeiten.',
    komponente: RoadmapFolie, beispiel: roadmap,
    limits: { label: 24, titel: 44, 'fundament.zeitraum': 24, 'fundament.titel': 28, 'fundament.punkte[]': 34, 'betreuung.zeitraum': 24, 'betreuung.titel': 28, 'betreuung.punkte[]': 34, 'meilensteine[].zeit': 20, 'meilensteine[].kpi': 44 },
    anzahl: { meilensteine: [2, 4] },
  },
  {
    id: 'strategie-balken', name: 'Balkendiagramm', gruppe: 'Strategie', quelle: q,
    zweck: 'research-markt / research-seo: Markt- und Suchzahlen als Balken, ein Wert hervorgehoben.',
    komponente: BalkenFolie, beispiel: balken,
    limits: { label: 24, titel: 44, text: 150, quelle: 80, 'balken[].label': 26, 'balken[].anzeige': 10 },
    anzahl: { balken: [2, 8] },
  },
  {
    id: 'strategie-linie', name: 'Liniendiagramm', gruppe: 'Strategie', quelle: q,
    zweck: 'research-markt / research-seo: Trend über 12 Monate, eine Reihe hervorgehoben (Nachfrage-Richtung).',
    komponente: LinieFolie, beispiel: linie,
    limits: { label: 24, titel: 44, text: 150, quelle: 80, 'achse[]': 6, 'reihen[].name': 40 },
    anzahl: { achse: [2, 12], reihen: [1, 3] },
  },
  {
    id: 'pitch-case', name: 'Referenz-Case', gruppe: 'Beweis', quelle: q,
    zweck: 'pitch-prep Abschnitt Relevante Referenzen: Kunde, Problem, Lösung, Ergebnisse, Bild.',
    komponente: PitchCaseFolie, beispiel: pitchCase,
    limits: { label: 24, kunde: 32, branche: 26, titel: 60, herausforderung: 100, loesung: 100, 'ergebnisse[].wert': 6, 'ergebnisse[].text': 44 },
    anzahl: { ergebnisse: [2, 3] },
  },
  {
    id: 'pitch-pakete', name: 'Angebotspakete', gruppe: 'Preis', quelle: q,
    zweck: 'pitch-prep Lösungsansatz / angebot: zwei bis drei Pakete nebeneinander, eins empfohlen.',
    komponente: PaketeFolie, beispiel: pakete,
    limits: { label: 24, titel: 44, 'pakete[].name': 24, 'pakete[].fuer': 48, 'pakete[].preis': 14, 'pakete[].einheit': 36, 'pakete[].punkte[]': 36 },
    anzahl: { pakete: [2, 3] },
  },
  {
    id: 'offene-fragen', name: 'Offene Fragen an den Kunden', gruppe: 'Ablauf', quelle: q,
    zweck: 'marketing-research-writer FEHLT-Marker und kundenfragen.md: offene Punkte mit Zuständigkeit.',
    komponente: OffeneFragenFolie, beispiel: offeneFragen,
    limits: { label: 24, titel: 44, text: 140, 'fragen[].frage': 90, 'fragen[].wer': 28, 'fragen[].zu': 28 },
    anzahl: { fragen: [2, 6] },
  },
];
