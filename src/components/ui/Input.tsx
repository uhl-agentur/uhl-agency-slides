import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  label?: string;
  type?: 'text' | 'email' | 'url' | 'number' | 'tel' | 'date';
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Debounced Input component with "Saved" indicator
 * Critical pattern from reference project - prevents excessive state updates
 */
export const Input: React.FC<InputProps> = ({
  value: externalValue = '',
  onChange,
  placeholder = 'Eingabe...',
  debounceMs = 300,
  className = '',
  label,
  type = 'text',
  disabled = false,
  onKeyDown,
}) => {
  const [localValue, setLocalValue] = useState(externalValue);
  const [showSaved, setShowSaved] = useState(false);
  const debouncedValue = useDebounce(localValue, debounceMs);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(externalValue);
  }, [externalValue]);

  // Trigger onChange when debounced value changes
  useEffect(() => {
    if (onChange && debouncedValue !== externalValue) {
      onChange(debouncedValue);
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [debouncedValue]);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="input-field w-full"
        />
        {showSaved && (
          <span className="saved-indicator absolute right-0 bottom-3">
            ✓ Saved
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
