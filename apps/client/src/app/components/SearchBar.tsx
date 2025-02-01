import { FC, useState, useCallback } from 'react';
import { Input } from '@erisfy/shadcnui';
import { Tag as TagComponent, TagGroup } from '@erisfy/shadcnui-blocks';
import { useDebounce } from '../../hooks/useDebounce';

type Tag = {
  id: string;
  value: string;
};

type SearchBarProps = {
  onSearch: (query: string) => void;
  /** Optional delay in milliseconds for debouncing search */
  debounceMs?: number;
  /** Optional maximum number of tags */
  maxTags?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  debounceMs = 300,
  maxTags = 5,
  ...props
}) => {
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  const debouncedSearch = useDebounce((value: string) => {
    onSearch(value);
  }, debounceMs);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      e.preventDefault();
      if (tags.length >= maxTags) return;

      const newTag: Tag = {
        id: crypto.randomUUID(),
        value: query.trim()
      };

      if (!tags.some(tag => tag.value === newTag.value)) {
        setTags(prev => [...prev, newTag]);
        setQuery('');
      }
    }
  }, [query, tags, maxTags]);

  const handleTagRemove = useCallback((tagId: string) => {
    setTags(prev => prev.filter(tag => tag.id !== tagId));
  }, []);

  return (
    <div 
      className="mb-4"
      role="search"
      aria-label="Search stocks"
    >
      <Input
        type="search"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full"
        aria-label="Search by ticker symbol or company name"
        {...props}
      />
      <TagGroup 
        className="mt-2"
        aria-label="Selected search filters"
      >
        {tags.map((tag) => (
          <TagComponent 
            key={tag.id}
            onRemove={() => handleTagRemove(tag.id)}
            aria-label={`Remove ${tag.value} filter`}
          >
            {tag.value}
          </TagComponent>
        ))}
      </TagGroup>
    </div>
  );
};
