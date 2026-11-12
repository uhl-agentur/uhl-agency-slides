import { notFound } from 'next/navigation';
import { deckNach } from '../../../../decks';
import { layoutNach } from '../../../../src/deck/registry';
import { FolienRahmen } from '../../../../src/deck/system';

// One deck: all slides stacked at 1920 x 1080; screen shows them at half size, print/PDF one page per slide.
export default async function DeckSeite({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deck = deckNach(slug);
  if (!deck) notFound();
  return (
    <main className="deck-ansicht">
      <title>{deck.titel}</title>
      <style>{`
        @page { size: 1920px 1080px; margin: 0; }
        html, body { margin: 0; background: #E3E3E3; }
        .deck-ansicht { display: flex; flex-direction: column; align-items: center; gap: 24px; padding: 24px 0; }
        .deck-folie { zoom: 0.5; box-shadow: 0 2px 12px rgba(0,0,0,.15); }
        .deck-fehler { width: 1920px; height: 1080px; display: grid; place-items: center; background: #fff; color: #B3261E; font: 600 48px sans-serif; }
        @media print {
          html, body { background: #fff; }
          .deck-ansicht { gap: 0; padding: 0; }
          .deck-folie { zoom: 1; box-shadow: none; break-after: page; }
          .deck-folie:last-child { break-after: auto; }
        }
      `}</style>
      {deck.folien.map((f, i) => {
        const l = layoutNach(f.layout);
        const K = l?.komponente;
        return (
          <div className="deck-folie" key={i}>
            <FolienRahmen thema={f.thema ?? deck.thema}>
              {K ? <K {...f.props} /> : <div className="deck-fehler">Unbekanntes Layout: {f.layout}</div>}
            </FolienRahmen>
          </div>
        );
      })}
    </main>
  );
}
