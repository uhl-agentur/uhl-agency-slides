import { Funnel_Display, Funnel_Sans } from 'next/font/google';
import '../../src/deck/deck.css';

// Same fonts as uhl-website: Funnel Display carries the voice, Funnel Sans everything that runs.
const display = Funnel_Display({ subsets: ['latin'], variable: '--font-funnel-display', display: 'block' });
const text = Funnel_Sans({ subsets: ['latin'], variable: '--font-funnel-sans', display: 'block' });

export default function UhlDeckLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${text.variable} uhl-deck`}>{children}</div>;
}
