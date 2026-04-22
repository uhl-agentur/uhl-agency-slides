import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface TextAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  rows?: number;
  disabled?: boolean;
  variant?: 'default' | 'notes';
}

/**
 * TextArea with debounce.
 * - default variant: auto-resizes with content
 * - notes variant: fixed height, scrolls overflow (for notes containers)
 */
export const TextArea: React.FC<TextAreaProps> = ({
  value: externalValue = '',
  onChange,
  placeholder = 'Eingabe...',
  debounceMs = 300,
  className = '',
  rows = 3,
  disabled = false,
  variant = 'default',
}) => {
  const [localValue, setLocalValue] = useState(externalValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debouncedValue = useDebounce(localValue, debounceMs);

  useEffect(() => {
    setLocalValue(externalValue);
  }, [externalValue]);

  useEffect(() => {
    if (onChange && debouncedValue !== externalValue) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (variant !== 'notes') {
      const target = e.target as HTMLTextAreaElement;
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
    }
  };

  const variantClass = variant === 'notes' ? 'notes-field' : 'input-field';
  const overflowClass = variant === 'notes' ? 'overflow-y-auto overflow-x-hidden' : '';

  return (
    <textarea
      ref={textareaRef}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onInput={handleInput}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className={`${variantClass} resize-none ${overflowClass} ${className}`}
    />
  );
};

export default TextArea;
