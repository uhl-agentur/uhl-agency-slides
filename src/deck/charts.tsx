'use client';

import React from 'react';
import { T } from './system';

/* ============================================================================
   Charts of the deck system: plain HTML/SVG, no chart library. Colours only
   via theme roles (--text, --hoch, --linie, --akzent), type only via t-*
   classes (smallest 18 px), radius never above --r. Lime marks the one key
   value per chart (a bar, the current milestone).
   ============================================================================ */

/* -------------------------------------------------------------- Balken --- */

export interface BalkenDaten {
  /** numeric value, sets the bar height relative to the largest bar */
  wert: number;
  /** tag on the bar, e.g. "1.250 €" */
  tag: string;
  /** name under the bar */
  label: string;
  /** second line under the name (meta, leise) */
  sub?: string;
  /** the one key bar: lime */
  hervorheben?: boolean;
}

/**
 * Vertical bars with a value tag on each bar and label + sublabel below.
 * Fills its parent (give it a height). Bar colour is the --balken role of the
 * slide theme (deck.css), the highlighted bar is lime.
 */
export function Balken({
  balken,
  max,
  className,
  style,
}: {
  balken: BalkenDaten[];
  /** max characters for tag / label / sub, outlines overflow like <T max> */
  max?: { tag?: number; label?: number; sub?: number };
  className?: string;
  style?: React.CSSProperties;
}) {
  const groesster = Math.max(...balken.map((b) => b.wert), 1);
  const farbe = 'var(--balken)'; // role from deck.css, follows a forced Folie theme too
  return (
    <div className={className} style={{ display: 'flex', gap: 'var(--s2)', height: '100%', ...style }}>
      {balken.map((b, i) => (
        <div key={i} style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'flex-end' }}>
            <div
              style={{
                width: '100%',
                height: `${Math.max(12, (b.wert / groesster) * 100)}%`,
                minHeight: 88,
                borderRadius: 'var(--r)',
                background: b.hervorheben ? 'var(--akzent)' : farbe,
                padding: 'var(--s1)',
              }}
            >
              <T
                stil="karte"
                max={max?.tag}
                style={{ display: 'inline-block', padding: '6px 12px', borderRadius: 'var(--r-sm)', background: 'var(--karte)', color: 'var(--text)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}
              >
                {b.tag}
              </T>
            </div>
          </div>
          <div style={{ textAlign: 'center', paddingTop: 'var(--s2)', height: 124 /* name + two meta lines: bars share one baseline */ }}>
            <T stil="karte" max={max?.label}>
              {b.label}
            </T>
            <T stil="meta" leise max={max?.sub} style={{ marginTop: 6, marginInline: 'auto' }}>
              {b.sub}
            </T>
          </div>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------- Venn3 --- */

export interface VennKreis {
  titel: string;
  text?: string;
}

/**
 * Three overlapping circles (top, bottom left, bottom right) with a label in
 * each and one label in the shared centre. Square, sized by `groesse` (px).
 * Overlaps darken by layering a translucent --text fill (theme-aware).
 */
export function Venn3({
  kreise,
  mitte,
  groesse = 760,
  max,
  className,
  style,
}: {
  kreise: [VennKreis, VennKreis, VennKreis];
  /** label of the shared centre; ==wort== highlights in lime */
  mitte: string;
  groesse?: number;
  max?: { titel?: number; text?: number; mitte?: number };
  className?: string;
  style?: React.CSSProperties;
}) {
  // circle centres and label anchors in 0..1 of the square
  const r = 0.3;
  const mitten = [
    { cx: 0.5, cy: 0.33 },
    { cx: 0.335, cy: 0.62 },
    { cx: 0.665, cy: 0.62 },
  ];
  const anker = [
    { x: 0.5, y: 0.17 },
    { x: 0.235, y: 0.7 },
    { x: 0.765, y: 0.7 },
  ];
  const breite = groesse * 0.32;
  return (
    <div className={className} style={{ position: 'relative', width: groesse, height: groesse, ...style }}>
      <svg viewBox="0 0 1 1" width={groesse} height={groesse} style={{ position: 'absolute', inset: 0, overflow: 'visible' }} aria-hidden>
        {mitten.map((m, i) => (
          <circle key={i} cx={m.cx} cy={m.cy} r={r} fill="var(--text)" fillOpacity={0.07} stroke="var(--linie)" strokeWidth={1 / groesse} />
        ))}
      </svg>
      {kreise.map((k, i) => (
        <div
          key={i}
          style={{ position: 'absolute', left: anker[i].x * groesse - breite / 2, top: anker[i].y * groesse, width: breite, transform: 'translateY(-50%)', textAlign: 'center' }}
        >
          <T stil="karte" max={max?.titel}>
            {k.titel}
          </T>
          <T stil="meta" leise max={max?.text} style={{ marginTop: 6, marginInline: 'auto' }}>
            {k.text}
          </T>
        </div>
      ))}
      <div style={{ position: 'absolute', left: 0.5 * groesse - breite / 2, top: 0.53 * groesse, width: breite, transform: 'translateY(-50%)', textAlign: 'center' }}>
        <T stil="karte" max={max?.mitte}>
          {mitte}
        </T>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- Zeitleiste --- */

export interface Meilenstein {
  titel: string;
  /** "März 2027", "Woche 3" */
  datum: string;
  text?: string;
}

/**
 * 3-6 milestones on a track. `erreicht` = how many milestones are done: the
 * track is filled up to the last one, which gets the lime marker.
 */
export function Zeitleiste({
  punkte,
  erreicht = 0,
  max,
  className,
  style,
}: {
  punkte: Meilenstein[];
  erreicht?: number;
  max?: { titel?: number; datum?: number; text?: number };
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={{ display: 'grid', gridTemplateColumns: `repeat(${punkte.length}, 1fr)`, ...style }}>
      {punkte.map((p, i) => {
        const fertig = i < erreicht - 1; // segment after a done milestone that leads to the next done one
        const aktuell = i === erreicht - 1;
        const erledigt = i < erreicht;
        return (
          <div key={i} style={{ minWidth: 0 }}>
            <T stil="karte" max={max?.titel} style={{ paddingRight: 'var(--s3)', minHeight: '2.4em', display: 'flex', alignItems: 'flex-end' }}>
              {p.titel}
            </T>
            <div style={{ position: 'relative', height: 20, margin: 'var(--s2) 0' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, top: 8, height: 4, background: fertig ? 'var(--text)' : 'var(--linie)' }} />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 20,
                  height: 20,
                  padding: 0,
                  borderRadius: 'var(--r-sm)',
                  background: aktuell ? 'var(--akzent)' : erledigt ? 'var(--text)' : 'var(--flaeche)',
                  border: aktuell || erledigt ? 'none' : '2px solid var(--linie)',
                }}
              />
            </div>
            <div className="stapel-s" style={{ paddingRight: 'var(--s3)' }}>
              <T stil="meta" leise max={max?.datum}>
                {p.datum}
              </T>
              <T stil="body" max={max?.text}>
                {p.text}
              </T>
            </div>
          </div>
        );
      })}
    </div>
  );
}
