import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

/**
 * Card container with gray background
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'lg',
}) => {
  const paddingStyles = {
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-14',
  };

  return (
    <div
      className={`bg-gray-100 rounded overflow-hidden ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
