import type { Deck } from '../src/deck/typen';

/* Minimal demo deck: shows the deck format. Real decks: copy this file, register in decks/index.ts. */
export const beispielDeck: Deck = {
  slug: 'beispiel',
  titel: 'Beispiel-Deck',
  marke: 'Uhl Werbeagentur · Beispiel',
  thema: 'light',
  folien: [
    {
      layout: 'titel-links',
      props: { titel: 'So sieht ein Uhl-Deck aus', unterzeile: 'Inhalt in decks/<slug>.ts, Gestaltung im Deck-System.', kunde: 'Uhl Werbeagentur', datum: 'November 2026' },
    },
    {
      layout: 'inhalt-zeilen',
      props: { label: 'Inhalt', titel: 'Was wir heute besprechen', kapitel: ['Ausgangslage', 'Strategie', 'Nächste Schritte'] },
    },
    {
      layout: 'titel-bild',
      thema: 'dark',
      props: { titel: 'Danke für Ihre Zeit', unterzeile: 'Uhl Werbeagentur · Augsburg' },
    },
  ],
};
