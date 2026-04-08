import React from 'react';

interface SlideLayoutProps {
  children: React.ReactNode;
  background?: 'white' | 'black';
  className?: string;
  hideFooter?: boolean;
}

/**
 * Standard slide layout wrapper
 * Maintains 1920x1080 dimensions with consistent padding
 */
export const SlideLayout: React.FC<SlideLayoutProps> = ({
  children,
  background = 'white',
  className = '',
  hideFooter = false,
}) => {
  const bgStyles = {
    white: 'bg-white text-black',
    black: 'bg-black text-white',
  };

  return (
    <div
      className={`w-slide h-slide flex flex-col p-slide-padding relative ${bgStyles[background]} ${className}`}
      style={{ width: '1920px', height: '1080px', padding: '80px' }}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>

      {!hideFooter && (
        <div className="absolute bottom-8 right-8 flex items-center gap-2 text-gray-400 text-sm">
          <span className="font-jakarta">uhl-werbeagentur.de</span>
        </div>
      )}
    </div>
  );
};

export default SlideLayout;
