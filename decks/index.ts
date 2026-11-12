import type { Deck } from '../src/deck/typen';
import { beispielDeck } from './beispiel';

/* Every deck registers here once; route /deck/<slug>. */
export const decks: Deck[] = [beispielDeck];

export const deckNach = (slug: string) => decks.find((d) => d.slug === slug);
