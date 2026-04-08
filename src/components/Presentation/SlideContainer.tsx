import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useKickoffStore } from '../../state/kickoffStore';

interface SlideContainerProps {
  children: React.ReactNode[];
}

/**
 * Main slide container with:
 * - Viewport scaling to maintain 1920x1080
 * - Keyboard navigation (Arrow keys, Space, F, Esc)
 * - Fullscreen support
 * - Progress bar
 */
export const SlideContainer: React.FC<SlideContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const {
    currentSlide,
    isFullscreen,
    isSettingsOpen,
    nextSlide,
    prevSlide,
    toggleFullscreen,
    toggleSettings,
  } = useKickoffStore();

  const totalSlides = children.length;
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  // Calculate scale to fit viewport
  const calculateScale = useCallback(() => {
    if (!containerRef.current) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // In editor mode, account for settings panel width
    const availableWidth = isSettingsOpen ? viewportWidth - 400 : viewportWidth;

    const scaleX = availableWidth / 1920;
    const scaleY = viewportHeight / 1080;

    // Use the smaller scale to fit completely
    // No padding in fullscreen mode to fill the entire screen
    const padding = isFullscreen ? 1 : 0.95;
    setScale(Math.min(scaleX, scaleY) * padding);
  }, [isSettingsOpen, isFullscreen]);

  // Recalculate on resize and settings toggle
  useEffect(() => {
    // Defer initial calculation to avoid lint warning about setState in effect
    const frame = requestAnimationFrame(calculateScale);
    window.addEventListener('resize', calculateScale);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', calculateScale);
    };
  }, [calculateScale]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'Escape':
          toggleSettings();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, toggleFullscreen, toggleSettings]);

  // Handle fullscreen API
  useEffect(() => {
    if (isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen?.();
      }
    }
  }, [isFullscreen]);

  return (
    <div
      ref={containerRef}
      className={`slide-viewport ${isFullscreen ? 'fullscreen-mode' : ''}`}
      style={{
        width: isSettingsOpen ? 'calc(100vw - 400px)' : '100vw',
        transition: 'width 0.3s ease',
      }}
    >
      {/* Slide Scaler */}
      <div
        className="slide-scaler"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        {children[currentSlide]}
      </div>

      {/* Progress Bar */}
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      />

      {/* Navigation Hints (only in non-fullscreen) */}
      {!isFullscreen && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-4 text-white/50 text-sm">
          <span>← → Navigate</span>
          <span>F Fullscreen</span>
          <span>Esc Settings</span>
        </div>
      )}

      {/* Slide Counter */}
      <div className="fixed bottom-4 right-4 text-white/70 text-sm font-jakarta">
        {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  );
};

export default SlideContainer;
