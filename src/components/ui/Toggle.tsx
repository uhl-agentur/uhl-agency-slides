import React from 'react';

interface ToggleProps {
  leftLabel: string;
  rightLabel: string;
  value: 'left' | 'right';
  onChange: (value: 'left' | 'right') => void;
  className?: string;
}

/**
 * Toggle Switch component for binary choices (e.g., Förmlich <-> Locker)
 */
export const Toggle: React.FC<ToggleProps> = ({
  leftLabel,
  rightLabel,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`toggle-switch ${className}`}>
      <button
        type="button"
        onClick={() => onChange('left')}
        className={`toggle-option ${value === 'left' ? 'active' : ''}`}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange('right')}
        className={`toggle-option ${value === 'right' ? 'active' : ''}`}
      >
        {rightLabel}
      </button>
    </div>
  );
};

export default Toggle;
