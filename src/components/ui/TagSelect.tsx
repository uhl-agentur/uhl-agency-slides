import React from 'react';

interface TagSelectProps {
  tags: readonly string[];
  selected: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

/**
 * Multi-select tag component for selecting multiple options
 */
export const TagSelect: React.FC<TagSelectProps> = ({
  tags,
  selected,
  onChange,
  className = '',
}) => {
  const handleTagClick = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => handleTagClick(tag)}
          className={`tag ${selected.includes(tag) ? 'selected' : ''}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagSelect;
