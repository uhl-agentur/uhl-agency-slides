'use client';

import React from 'react';
import Link from 'next/link';
import { Presentation, Sparkles, Target, BarChart3, FileText, FileCode } from 'lucide-react';

interface DeckCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  available: boolean;
}

const decks: DeckCard[] = [
  {
    id: 'pitch',
    title: 'Pitch',
    subtitle: 'Akquise',
    description: 'Überzeugende Pitch-Präsentation für potenzielle Neukunden und Projekte.',
    icon: <Sparkles size={48} />,
    href: '/pitch',
    available: false,
  },
  {
    id: 'kickoff',
    title: 'Kick-Off',
    subtitle: 'Projekt Start',
    description: 'Interaktive Präsentation für den Projekt-Kickoff mit Kunden. Erfassen Sie alle wichtigen Informationen.',
    icon: <Presentation size={48} />,
    href: '/kickoff',
    available: true,
  },
  {
    id: 'konzept',
    title: 'Konzept',
    subtitle: 'Präsentation',
    description: 'Konzeptpräsentation zur Vorstellung von Ideen und Entwürfen.',
    icon: <Target size={48} />,
    href: '/konzept',
    available: false,
  },
  {
    id: 'recap',
    title: 'Recap',
    subtitle: 'Rückblick',
    description: 'Zusammenfassung und Rückblick auf abgeschlossene Projektphasen.',
    icon: <BarChart3 size={48} />,
    href: '/recap',
    available: false,
  },
  {
    id: 'reporting',
    title: 'Reporting',
    subtitle: 'Berichte',
    description: 'Professionelle Reports und Auswertungen für Ihre Kunden.',
    icon: <FileText size={48} />,
    href: '/reporting',
    available: false,
  },
  {
    id: 'markdown',
    title: 'Markdown',
    subtitle: 'Exporter',
    description: 'Konvertieren Sie Markdown in formatierte Dokumente im UHL Design.',
    icon: <FileCode size={48} />,
    href: '/markdown',
    available: true,
  },
];

export const StartPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-16">
      {/* Logo */}
      <div className="mb-12">
        <img
          src="/Uhl-Logo.svg"
          alt="UHL Werbeagentur"
          className="w-20 h-20"
        />
      </div>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="font-humane text-[120px] leading-none uppercase tracking-wide mb-4">
          Slide Decks
        </h1>
        <p className="font-jakarta text-xl text-gray-600">
          Wählen Sie eine Präsentation aus
        </p>
      </div>

      {/* Deck Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {decks.map((deck) => (
          <DeckCardComponent key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
};

const DeckCardComponent: React.FC<{ deck: DeckCard }> = ({ deck }) => {
  const cardContent = (
    <div
      className={`
        group relative flex flex-col h-full p-8 border-2 transition-all
        ${deck.available
          ? 'border-black hover:bg-black hover:text-white cursor-pointer'
          : 'border-gray-200 opacity-50 cursor-not-allowed'
        }
      `}
    >

      {/* Icon */}
      <div className={`mb-6 ${deck.available ? 'group-hover:text-primary' : ''} transition-colors`}>
        {deck.icon}
      </div>

      {/* Title */}
      <h3 className="font-humane text-5xl uppercase tracking-wide mb-1">
        {deck.title}
      </h3>
      <p className={`font-jakarta text-sm mb-4 ${deck.available ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-400'}`}>
        {deck.subtitle}
      </p>

      {/* Description */}
      <p className={`font-jakarta text-sm flex-1 ${deck.available ? 'text-gray-600 group-hover:text-gray-300' : 'text-gray-400'}`}>
        {deck.description}
      </p>

      {/* Arrow */}
      {deck.available && (
        <div className="mt-6 flex items-center gap-2 font-jakarta font-bold text-sm group-hover:text-primary transition-colors">
          Starten
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      )}
    </div>
  );

  if (deck.available) {
    return (
      <Link href={deck.href} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default StartPage;
