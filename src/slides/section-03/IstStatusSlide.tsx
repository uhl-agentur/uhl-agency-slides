import React from 'react';
import { useKickoffStore } from '../../state/kickoffStore';
import { Badge } from '../../components/ui';
import { Check } from 'lucide-react';

/**
 * Slide 14: Ist-Status
 * Based on Figma design
 * Single card: screenshot left, pain points right, URL at bottom of screenshot
 */
export const IstStatusSlide: React.FC = () => {
  const { istStatus, updateIstStatus, togglePainPoint, projectSettings } = useKickoffStore();

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

  const painPoints: { key: keyof typeof istStatus.painPoints; label: string }[] = [
    { key: 'designVeraltet', label: 'Design veraltet?' },
    { key: 'schwerZuPflegen', label: 'Schwer zu pflegen?' },
    { key: 'nichtMobilOptimiert', label: 'Nicht mobil-optimiert?' },
    { key: 'langsam', label: 'Schlechte Performance?' },
    { key: 'keineAnalytics', label: 'Keine Anfragen?' },
  ];

  return (
    <div
      className="bg-white flex flex-col"
      style={{ width: '1920px', height: '1080px', padding: '80px', gap: '80px' }}
    >
      {/* Header */}
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
          <span className="block">Falls vorhanden, Was funktioniert gut?</span>
          <span className="block">Was muss sich ändern?</span>
        </p>
      </div>

      {/* Single row: screenshot left + pain points right, fill remaining height */}
      <div className="flex-1 flex items-stretch">
        {/* Left: Screenshot area */}
        <div
          className="flex flex-col"
          style={{ flex: '3', backgroundColor: '#F7F7F7' }}
        >
          <div className="flex-1 relative overflow-hidden">
            {istStatus.screenshotUrl ? (
              <>
                <img
                  src={istStatus.screenshotUrl}
                  alt="Website Screenshot"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Inside border overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ border: '8px solid #F7F7F7' }}
                />
                <button
                  onClick={() => updateIstStatus({ screenshotUrl: null })}
                  className="absolute top-3 right-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
                  style={{ zIndex: 2 }}
                >
                  ✕
                </button>
              </>
            ) : (
              <label className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center gap-4 border-2 rounded-lg transition-colors" style={{ borderColor: 'rgba(0, 0, 0, 0.08)', margin: '32px' }}>
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

          {/* URL field at bottom */}
          <div
            className="flex items-center font-jakarta"
            style={{
              padding: '16px 32px',
              gap: '16px',
              fontSize: '20px',
              borderTop: '2px solid rgba(0,0,0,0.08)',
            }}
          >
            <span className="font-bold text-black" style={{ flexShrink: 0 }}>URL:</span>
            <span className="text-black" style={{ fontSize: '20px' }}>
              {projectSettings.domain || 'Keine Domain hinterlegt'}
            </span>
          </div>
        </div>

        {/* Right: Pain Points */}
        <div
          className="flex flex-col relative"
          style={{ flex: '2', backgroundColor: '#F7F7F7' }}
        >
          <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
            <Badge variant="primary" size="md">
              Aktuelle Pain Points
            </Badge>
          </div>

          <div
            className="flex flex-col justify-center flex-1"
            style={{ padding: '56px', paddingTop: '80px', gap: '40px' }}
          >
            {painPoints.map((point) => {
              const isChecked = istStatus.painPoints[point.key];
              return (
                <button
                  key={point.key}
                  onClick={() => togglePainPoint(point.key)}
                  className="flex items-center cursor-pointer"
                  style={{ gap: '16px' }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '24px',
                      height: '24px',
                      border: '2px solid black',
                      borderRadius: '4px',
                      backgroundColor: isChecked ? 'black' : 'transparent',
                      flexShrink: 0,
                    }}
                  >
                    {isChecked && <Check size={16} strokeWidth={3} color="white" />}
                  </div>
                  <span className="font-jakarta text-black" style={{ fontSize: '24px' }}>
                    {point.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IstStatusSlide;
