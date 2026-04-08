import React from 'react';
import { useKickoffStore } from '../../state/kickoffStore';
import { Badge, TextArea } from '../../components/ui';

/**
 * Slide 11: Like & Dislike Slide
 * Based on Figma node: 343:23535 "Like & Dislike"
 * Dual layout for capturing design preferences
 */
export const LikeDislikeSlide: React.FC = () => {
  const { likeDislike, updateLikeDislike } = useKickoffStore();

  return (
    <div
      className="bg-white flex flex-col"
      style={{ width: '1920px', height: '1080px', padding: '80px', gap: '80px' }}
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
          Like & Dislike
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px', width: '674px' }}>
          Was gefällt Ihnen? Was mögen Sie gar nicht? Konkrete Beispiele helfen uns sehr.
        </p>
      </div>

      {/* Dual Cards - 80px gap per Figma */}
      <div className="flex flex-1" style={{ gap: '80px' }}>
        {/* Like Column */}
        <div className="flex-1 flex flex-col relative h-full" style={{ paddingBottom: '56px' }}>
          <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
            <Badge variant="primary" size="md">
              Like
            </Badge>
          </div>

          <div
            className="flex flex-col flex-1"
            style={{
              backgroundColor: '#F7F7F7',
              padding: '56px',
              paddingTop: '120px',
              marginBottom: '-56px',
              zIndex: 1,
            }}
          >
            <div className="w-full h-full overflow-hidden">
              <TextArea
                value={likeDislike.likes}
                onChange={(v) => updateLikeDislike({ likes: v })}
                placeholder="Notizen"
                className="font-jakarta text-black w-full h-full placeholder:opacity-20"
                variant="notes"
              />
            </div>
          </div>
        </div>

        {/* Dislike Column */}
        <div className="flex-1 flex flex-col relative h-full" style={{ paddingBottom: '56px' }}>
          <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
            <Badge variant="primary" size="md">
              Dislike
            </Badge>
          </div>

          <div
            className="flex flex-col flex-1"
            style={{
              backgroundColor: '#F7F7F7',
              padding: '56px',
              paddingTop: '120px',
              marginBottom: '-56px',
              zIndex: 1,
            }}
          >
            <div className="w-full h-full overflow-hidden">
              <TextArea
                value={likeDislike.dislikes}
                onChange={(v) => updateLikeDislike({ dislikes: v })}
                placeholder="Notizen"
                className="font-jakarta text-black w-full h-full placeholder:opacity-20"
                variant="notes"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeDislikeSlide;
