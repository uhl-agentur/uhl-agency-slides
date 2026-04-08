import React from 'react';
import { useKickoffStore } from '../../state/kickoffStore';

/**
 * Slide 6: Competitor Analysis Slide
 * Based on Figma node: 343:23406 "competitor"
 * Table layout showing competitors analysis
 */
export const CompetitorSlide: React.FC = () => {
  const { competitors, updateCompetitor } = useKickoffStore();

  return (
    <div
      className="bg-white flex flex-col items-start justify-between"
      style={{ width: '1920px', height: '1080px', padding: '80px' }}
    >
      {/* Header - 32px gap between title and subtitle per Figma */}
      <div className="flex flex-col" style={{ gap: '32px' }}>
        <h1
          className="font-humane text-black uppercase"
          style={{
            fontSize: '128px',
            lineHeight: '0.75em',
            letterSpacing: '2.56px',
          }}
        >
          Competitor
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          <span className="block">Wer sind Ihre 2 bis 3 stärksten direkten Konkurrenten?</span>
          <span className="block">Was machen diese besser, was schlechter?</span>
        </p>
      </div>

      {/* Table Card */}
      <div
        className="w-full flex flex-col"
        style={{ backgroundColor: '#F7F7F7', padding: '56px', gap: '56px' }}
      >
        {/* Table Header */}
        <div className="flex flex-col" style={{ gap: '32px' }}>
          <div
            className="flex items-center font-jakarta font-extrabold text-black"
            style={{ gap: '120px', fontSize: '32px' }}
          >
            <span className="flex-1">Wettbewerber</span>
            <span className="flex-1">Stärken</span>
            <span className="flex-1">Schwächen</span>
            <span className="flex-1">URL</span>
          </div>
          <div className="line-separator" />
        </div>

        {/* Table Rows - editable inputs */}
        {competitors.map((competitor) => (
          <div
            key={competitor.id}
            className="flex items-center font-jakarta text-black"
            style={{ gap: '120px', fontSize: '24px' }}
          >
            <div className="flex-1 overflow-hidden">
              <input
                type="text"
                value={competitor.name}
                onChange={(e) => updateCompetitor(competitor.id, { name: e.target.value })}
                placeholder="Firma"
                className="w-full bg-transparent outline-none font-jakarta text-black placeholder:opacity-20"
                style={{ fontSize: '24px' }}
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <input
                type="text"
                value={competitor.staerken}
                onChange={(e) => updateCompetitor(competitor.id, { staerken: e.target.value })}
                placeholder="Vorteile"
                className="w-full bg-transparent outline-none font-jakarta text-black placeholder:opacity-20"
                style={{ fontSize: '24px' }}
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <input
                type="text"
                value={competitor.schwaechen}
                onChange={(e) => updateCompetitor(competitor.id, { schwaechen: e.target.value })}
                placeholder="Nachteile"
                className="w-full bg-transparent outline-none font-jakarta text-black placeholder:opacity-20"
                style={{ fontSize: '24px' }}
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <input
                type="text"
                value={competitor.url}
                onChange={(e) => updateCompetitor(competitor.id, { url: e.target.value })}
                placeholder="Webseite"
                className="w-full bg-transparent outline-none font-jakarta text-black placeholder:opacity-20"
                style={{ fontSize: '24px' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitorSlide;
