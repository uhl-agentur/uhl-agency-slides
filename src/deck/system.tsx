'use client';

import React, { createContext, useContext } from 'react';
import { logoBlock } from './logo';
import { cx, sichtbareLaenge } from './cx';

/* ============================================================================
   Primitives of the deck system. Every layout is built only from these plus
   the classes in deck.css. Text goes through <T> so the character limits of
   the registry show up on the slide (dashed red outline) before a deck ships.
   ============================================================================ */

export type Thema = 'light' | 'dark';

export interface FolienKontextWert {
  thema: Thema;
  /** bottom left: client or deck name */
  marke?: string;
  /** bottom right: "03 / 24" */
  seite?: string;
}

export const FolienKontext = createContext<FolienKontextWert>({ thema: 'light' });

/** Sets theme, marke and page number for the slide(s) inside (usable from server pages). */
export function FolienRahmen({ children, ...wert }: FolienKontextWert & { children: React.ReactNode }) {
  return <FolienKontext.Provider value={wert}>{children}</FolienKontext.Provider>;
}


/* -------------------------------------------------------------- Folie --- */

export function Folie({
  label,
  logo = true,
  aufBild = false,
  chrome = true,
  thema: themaOverride,
  children,
}: {
  /** top left: chapter of the deck ("Ausgangslage"). */
  label?: string;
  logo?: boolean;
  /** chrome in light colours because the slide is a full-bleed picture */
  aufBild?: boolean;
  /** false: no label, marke, page number (cover, full-bleed) */
  chrome?: boolean;
  /** force a theme (rare: a picture slide inside a light deck) */
  thema?: Thema;
  children: React.ReactNode;
}) {
  const k = useContext(FolienKontext);
  const thema = themaOverride ?? k.thema;
  return (
    <section className={cx('folie', `thema-${thema}`, aufBild && 'auf-bild')}>
      {children}
      {chrome && label && <div className="chrome-label">{label}</div>}
      {logo && <UhlZeichen />}
      {chrome && k.marke && <div className="chrome-marke">{k.marke}</div>}
      {chrome && k.seite && <div className="chrome-seite">{k.seite}</div>}
    </section>
  );
}

export function UhlZeichen({ className = 'chrome-logo' }: { className?: string }) {
  return (
    <div className={className} aria-label="Uhl Werbeagentur">
      <svg viewBox={`0 0 ${logoBlock.breite} ${logoBlock.hoehe}`} fill="currentColor" style={{ display: 'block', width: '100%', height: '100%' }}>
        {logoBlock.pfade.map((d) => (
          <path key={d.slice(0, 16)} d={d} />
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ T --- */

type Stil = 'display' | 'aussage' | 'titel' | 'zahl' | 'zahl-s' | 'karte' | 'lead' | 'body' | 'meta' | 'zitat';

/**
 * Text with a character limit. `==wort==` marks a lime highlight, `\n` breaks a line.
 * Over the limit the element gets `zu-lang` (dashed outline on screen, never in print).
 */
export function T({
  stil,
  as: Tag = 'p',
  max,
  leise,
  className,
  style,
  children,
}: {
  stil: Stil;
  as?: keyof React.JSX.IntrinsicElements;
  max?: number;
  leise?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: string;
}) {
  if (!children) return null;
  const zuLang = max !== undefined && sichtbareLaenge(children) > max;
  const fehlt = children.startsWith('FEHLT:');
  const El = Tag as React.ElementType;
  return (
    <El className={cx(`t-${stil}`, leise && 'leise', zuLang && 'zu-lang', fehlt && 'fehlt', className)} style={style} title={zuLang ? `${sichtbareLaenge(children)} / ${max} Zeichen` : undefined}>
      {formatiere(children)}
    </El>
  );
}


function formatiere(s: string): React.ReactNode {
  const zeilen = s.split('\n');
  return zeilen.map((z, i) => (
    <React.Fragment key={i}>
      {z.split(/(==[^=]+==)/g).map((teil, j) =>
        teil.startsWith('==') && teil.endsWith('==') ? <mark key={j}>{teil.slice(2, -2)}</mark> : <React.Fragment key={j}>{teil}</React.Fragment>,
      )}
      {i < zeilen.length - 1 && <br />}
    </React.Fragment>
  ));
}

/* -------------------------------------------------------------- Liste --- */

export function Liste({
  punkte,
  stil = 'body',
  max,
  nummer,
  className,
}: {
  punkte?: string[];
  stil?: Stil;
  max?: number;
  nummer?: boolean;
  className?: string;
}) {
  if (!punkte?.length) return null;
  return (
    <ul className={cx(nummer ? 'liste-nummer' : 'liste', `t-${stil}`, className)}>
      {punkte.map((p, i) => (
        <li key={i} className={cx(max !== undefined && sichtbareLaenge(p) > max && 'zu-lang')}>
          {formatiere(p)}
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------------------- Bild --- */

export interface BildDaten {
  src?: string;
  alt?: string;
  /** caption below the picture (meta, leise) */
  text?: string;
  /** object-position, e.g. "50% 20%" for a face */
  fokus?: string;
}

/** A picture or, without src, a grey frame that names what belongs there. */
export function Bild({
  bild,
  platzhalter = 'Bild',
  className,
  style,
  eckig,
  portrait,
  schleier,
  unterschrift = true,
}: {
  bild?: BildDaten;
  platzhalter?: string;
  className?: string;
  style?: React.CSSProperties;
  eckig?: boolean;
  portrait?: boolean;
  schleier?: 'unten' | 'oben' | 'voll';
  unterschrift?: boolean;
}) {
  const rahmen = (
    <div className={cx('bild', eckig && 'eckig', portrait && 'portrait', schleier && `schleier-${schleier}`, !unterschrift && className)} style={unterschrift ? { width: '100%', height: '100%' } : style}>
      {bild?.src ? <img src={bild.src} alt={bild.alt ?? ''} style={bild.fokus ? { objectPosition: bild.fokus } : undefined} /> : <div className="bild-leer">{platzhalter}</div>}
    </div>
  );
  if (!unterschrift || !bild?.text) {
    return unterschrift ? <div className={className} style={style}>{rahmen}</div> : rahmen;
  }
  return (
    <figure className={className} style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <div style={{ flex: 1, minHeight: 0 }}>{rahmen}</div>
      <figcaption className="t-meta leise bildunterschrift">{bild.text}</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------ Kennzahl --- */

export interface KennzahlDaten {
  wert: string;
  text: string;
}

export function Kennzahl({
  k,
  variante = 'dunkel',
  gross = true,
  className,
  style,
}: {
  k: KennzahlDaten;
  variante?: 'dunkel' | 'hoch' | 'akzent' | 'glas' | 'frei';
  gross?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const kl = variante === 'dunkel' ? 'kachel-dunkel' : variante === 'hoch' ? 'kachel' : variante === 'akzent' ? 'kachel-akzent' : variante === 'glas' ? 'kachel-glas' : '';
  return (
    <div className={cx(kl, className)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24, ...style }}>
      <T stil={gross ? 'zahl' : 'zahl-s'} max={8}>
        {k.wert}
      </T>
      <T stil="meta" leise max={60}>
        {k.text}
      </T>
    </div>
  );
}

export { cx, sichtbareLaenge };
