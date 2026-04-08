import React from 'react';
import { useKickoffStore } from '../../state/kickoffStore';
import { Badge, TextArea } from '../../components/ui';

/**
 * Slide 13: Website Ziele
 * Based on Figma node: 343:23562
 * Priority selection for website goals - 3 column grid layout
 */
export const WebsiteZieleSlide: React.FC = () => {
  const { websiteZiele, setGoalPriority, updateWebsiteZiele } = useKickoffStore();

  const handlePriorityClick = (goalId: string) => {
    const goal = websiteZiele.goals.find(g => g.id === goalId);
    if (!goal) return;

    const assignedPriorities = websiteZiele.goals
      .filter(g => g.priority !== null)
      .map(g => g.priority!);

    if (goal.priority !== null) {
      setGoalPriority(goalId, null);
    } else {
      const nextPriority = assignedPriorities.length > 0
        ? Math.max(...assignedPriorities) + 1
        : 1;
      if (nextPriority <= 9) {
        setGoalPriority(goalId, nextPriority);
      }
    }
  };

  return (
    <div
      className="bg-white flex flex-col justify-between"
      style={{ width: '1920px', height: '1080px', padding: '80px' }}
    >
      {/* Header - 32px gap per Figma */}
      <div className="flex flex-col" style={{ gap: '32px' }}>
        <h1
          className="font-humane text-black uppercase"
          style={{
            fontSize: '128px',
            lineHeight: '0.75em',
            letterSpacing: '2.56px',
          }}
        >
          Website ziele
        </h1>
        <div className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          <p>Was ist das primäre Ziel der neuen Website?</p>
          <p>Bitte priorisieren Sie. (1 = höchste Priorität)</p>
        </div>
      </div>

      {/* Goals Card with 3-column grid */}
      <div className="flex flex-col relative" style={{ paddingBottom: '56px' }}>
        <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
          <Badge variant="primary" size="md">
            Priorisierung
          </Badge>
        </div>

        <div
          style={{
            backgroundColor: '#F7F7F7',
            padding: '56px',
            paddingTop: '104px',
            marginBottom: '-56px',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            columnGap: '170px',
            rowGap: '56px',
          }}
        >
          {websiteZiele.goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => handlePriorityClick(goal.id)}
              className="flex items-center cursor-pointer"
              style={{ gap: '32px', opacity: goal.priority !== null ? 1 : 0.2 }}
            >
              <div
                className="flex items-center justify-center font-jakarta font-extrabold"
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  padding: '8px',
                  fontSize: '24px',
                  minWidth: '48px',
                  fontFeatureSettings: "'lnum', 'pnum'",
                }}
              >
                {goal.priority !== null ? String(goal.priority).padStart(2, '0') : '--'}
              </div>
              <p className="font-jakarta text-black text-left" style={{ fontSize: '32px' }}>
                {goal.isCustom && !goal.label ? 'weiteres hinzufügen...' : goal.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Notes - per Figma: 2px black border, 24px padding, 104px height */}
      <div
        className="w-full"
        style={{
          border: '2px solid black',
          padding: '24px',
          height: '104px',
        }}
      >
        <TextArea
          value={websiteZiele.notizen}
          onChange={(v) => updateWebsiteZiele({ notizen: v })}
          placeholder="Notizen"
          variant="notes"
          className="font-jakarta text-black w-full h-full"
        />
      </div>
    </div>
  );
};

export default WebsiteZieleSlide;
