import React from 'react';
import { Carlito } from 'next/font/google';
import { allDonauriesSlides } from '../../src/slides/donauries-social/slides';

// Calibri look of the Gesprächsgrundlage decks; Carlito is metric-compatible
const carlito = Carlito({ subsets: ['latin'], weight: ['400', '700'], style: ['normal', 'italic'], variable: '--font-carlito' });

// All slides stacked at 1920x1080; screen shows them scaled, print/PDF uses one page per slide
export default function DonauriesSocialPage() {
  return (
    <main className={`${carlito.variable} deck`}>
      <style>{`
        @page { size: 1920px 1080px; margin: 0; }
        html, body { margin: 0; background: #E5E5E5; }
        .deck { display: flex; flex-direction: column; align-items: center; gap: 24px; padding: 24px 0; }
        .deck-slide { zoom: 0.5; box-shadow: 0 2px 12px rgba(0,0,0,0.15); }
        @media print {
          html, body { background: #FFFFFF; }
          .deck { gap: 0; padding: 0; }
          .deck-slide { zoom: 1; box-shadow: none; break-after: page; }
          .deck-slide:last-child { break-after: auto; }
        }
      `}</style>
      {allDonauriesSlides.map((S, i) => (
        <div key={i} className="deck-slide">
          <S />
        </div>
      ))}
    </main>
  );
}
