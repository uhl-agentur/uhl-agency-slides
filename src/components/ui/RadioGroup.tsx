import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string | null;
  onChange: (value: string) => void;
  name: string;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

/**
 * Radio button group for single selection
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name: _name,
  className = '',
  direction = 'vertical',
}) => {
  const directionStyles = {
    horizontal: 'flex flex-row gap-6',
    vertical: 'flex flex-col gap-3',
  };

  return (
    <div className={`${directionStyles[direction]} ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div
            onClick={() => onChange(option.value)}
            className={`w-6 h-6 rounded-full border-2 border-black flex items-center justify-center transition-all ${
              value === option.value ? 'bg-primary' : 'bg-white'
            }`}
          >
            {value === option.value && (
              <div className="w-3 h-3 rounded-full bg-black" />
            )}
          </div>
          <span className="font-jakarta text-body">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
