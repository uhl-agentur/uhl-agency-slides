import { layouts } from '../../../src/deck/registry';
import { FolienRahmen } from '../../../src/deck/system';
import { pruefeLimits } from '../../../src/deck/typen';

// Gallery: every layout in light and dark, filled with its sample content.
export default function Vorlagen() {
  return (
    <main className="galerie">
      <style>{`
        @page { size: 1920px 1080px; margin: 0; }
        html, body { margin: 0; background: #E3E3E3; }
        .galerie { padding: 48px; font-family: var(--font-funnel-sans), sans-serif; }
        .galerie h1 { font: 600 40px/1.1 var(--font-funnel-display), sans-serif; margin: 0 0 8px; }
        .galerie .info { font-size: 16px; color: #555; margin-bottom: 40px; }
        .reihe { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 56px; }
        .kopf { grid-column: 1 / -1; display: flex; gap: 16px; align-items: baseline; font-size: 16px; color: #333; }
        .kopf b { font-size: 20px; }
        .kopf a { color: inherit; }
        .fehler { color: #B3261E; }
        .mini { width: 960px; height: 540px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.12); }
        .mini > section { zoom: 0.5; }
        @media print {
          .galerie { padding: 0; } .galerie > h1, .galerie > .info, .kopf { display: none; }
          .reihe { display: block; margin: 0; } .mini { width: auto; height: auto; box-shadow: none; break-after: page; }
          .mini > section { zoom: 1; }
          .reihe:last-child .mini:last-child { break-after: auto; }
        }
      `}</style>
      <h1>Uhl Deck-Vorlagen</h1>
      <p className="info">{layouts.length} Layouts · je hell und dunkel = {layouts.length * 2} Folien · Einzelansicht: /vorlagen/&lt;id&gt;?thema=dark</p>
      {layouts.map((l) => {
        const fehler = pruefeLimits(l.beispiel, l);
        const K = l.komponente;
        return (
          <div className="reihe" key={l.id} id={l.id}>
            <div className="kopf">
              <b>{l.name}</b>
              <a href={`/vorlagen/${l.id}`}>{l.id}</a>
              <span>{l.gruppe}</span>
              <span>{l.zweck}</span>
              {fehler.length > 0 && <span className="fehler">{fehler.join(' · ')}</span>}
            </div>
            {(['light', 'dark'] as const).map((thema) => {
              return (
                <div className="mini" key={thema}>
                  <FolienRahmen thema={thema}>
                    <K {...l.beispiel} />
                  </FolienRahmen>
                </div>
              );
            })}
          </div>
        );
      })}
    </main>
  );
}
