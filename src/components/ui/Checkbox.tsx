import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

/**
 * Styled Checkbox component
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  className = '',
}) => {
  return (
    <label className={`checkbox-item ${className}`}>
      <div
        onClick={() => onChange(!checked)}
        className={`checkbox-box ${checked ? 'checked' : ''}`}
      >
        {checked && <Check size={16} strokeWidth={3} />}
      </div>
      {label && (
        <span className="font-jakarta text-body">{label}</span>
      )}
    </label>
  );
};

export default Checkbox;
