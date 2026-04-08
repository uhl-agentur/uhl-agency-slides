import React from 'react';
import { useKickoffStore } from '../../state/kickoffStore';
import { Badge } from '../../components/ui';

/**
 * Slide 14: Ist-Status
 * Based on Figma design
 * Current website status with leitfragen and screenshot
 */
export const IstStatusSlide: React.FC = () => {
  const { istStatus, updateIstStatus } = useKickoffStore();

  const questions = [
    'Wie sieht Ihre aktuelle Website aus?',
    'Was sind die größten Probleme?',
    'Was funktioniert bereits gut?',
  ];

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateIstStatus({ screenshotUrl: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

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
          Ist-Status
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          Wie sieht Ihre aktuelle Website aus? Was sind die größten Probleme?
        </p>
      </div>

      {/* Content - Two columns */}
      <div className="flex flex-1" style={{ gap: '80px' }}>
        {/* Left: Leitfragen */}
        <div className="flex-1 flex flex-col relative h-full" style={{ paddingBottom: '56px' }}>
          <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
            <Badge variant="primary" size="md">
              Leitfragen
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
              gap: '32px',
            }}
          >
            {questions.map((q, index) => (
              <React.Fragment key={index}>
                <p className="font-jakarta text-black" style={{ fontSize: '24px' }}>
                  {q}
                </p>
                {index < questions.length - 1 && <div className="line-separator" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right: Screenshot */}
        <div className="flex-1 flex flex-col relative h-full" style={{ paddingBottom: '56px' }}>
          <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
            <Badge variant="primary" size="md">
              Screenshot
            </Badge>
          </div>

          <div
            className="flex flex-col flex-1 items-center justify-center"
            style={{
              backgroundColor: '#F7F7F7',
              padding: '56px',
              paddingTop: '120px',
              marginBottom: '-56px',
              zIndex: 1,
            }}
          >
            {istStatus.screenshotUrl ? (
              <div className="relative">
                <img
                  src={istStatus.screenshotUrl}
                  alt="Website Screenshot"
                  className="max-w-full object-contain"
                  style={{ mixBlendMode: 'darken' }}
                />
                <button
                  onClick={() => updateIstStatus({ screenshotUrl: null })}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center gap-4 p-12 border-2 rounded-lg transition-colors" style={{ borderColor: 'rgba(0, 0, 0, 0.08)' }}>
                <span className="font-jakarta text-gray-500 text-center" style={{ fontSize: '24px' }}>
                  Screenshot hier hochladen
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IstStatusSlide;
