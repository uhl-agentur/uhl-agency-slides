import { layouts } from '../../../src/deck/registry';
import { FolienRahmen } from '../../../src/deck/system';
import { pfadVon } from '../../../src/deck/typen';
import { TypoMessung } from './messung';

// Type inventory: renders every layout with its sample content (hidden below), then measures
// which font sizes the slides really use (computed style of every text element), grouped by
// size, weight, line height and family, with the t-* class and the layouts that use it.
export default function Typo() {
  return (
    <main style={{ padding: 48, background: '#F0F0F0', minHeight: '100vh', fontFamily: 'var(--font-funnel-sans), sans-serif' }}>
      <h1 style={{ font: '600 40px/1.1 var(--font-funnel-display), sans-serif', margin: '0 0 8px' }}>Schriftgrößen im Einsatz</h1>
      <p style={{ fontSize: 16, color: '#555', margin: '0 0 32px' }}>
        Gemessen an allen {layouts.length} Varianten (Beispielinhalt, hell). Jede Zeile: echte Größe, Stil, Zahl der Textstellen, Layouts.
      </p>
      <TypoMessung />
      <div id="typo-quelle" aria-hidden style={{ position: 'absolute', left: -99999, top: 0 }}>
        {layouts.map((l) => {
          const K = l.komponente;
          return (
            <div key={pfadVon(l)} data-layout={pfadVon(l)}>
              <FolienRahmen thema="light">
                <K {...l.beispiel} />
              </FolienRahmen>
            </div>
          );
        })}
      </div>
    </main>
  );
}
