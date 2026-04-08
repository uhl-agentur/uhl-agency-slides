import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface TextAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  label?: string;
  rows?: number;
  disabled?: boolean;
  variant?: 'default' | 'notes';
}

/**
 * Auto-resizing TextArea with debounce and "Saved" indicator
 */
export const TextArea: React.FC<TextAreaProps> = ({
  value: externalValue = '',
  onChange,
  placeholder = 'Eingabe...',
  debounceMs = 300,
  className = '',
  label,
  rows = 3,
  disabled = false,
  variant = 'default',
}) => {
  const [localValue, setLocalValue] = useState(externalValue);
  const [showSaved, setShowSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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

  // Auto-resize textarea
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  const variantStyles = {
    default: 'input-field resize-none',
    notes: 'notes-field resize-none',
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onInput={handleInput}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={`w-full overflow-y-auto overflow-x-hidden ${variantStyles[variant]}`}
        />
        {showSaved && (
          <span className="saved-indicator absolute right-2 bottom-2">
            ✓ Saved
          </span>
        )}
      </div>
    </div>
  );
};

export default TextArea;
