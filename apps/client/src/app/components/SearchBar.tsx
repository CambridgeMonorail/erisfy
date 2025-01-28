import { FC, useState } from 'react';
import { Input } from '@erisfy/shadcnui';
import { Tag, TagGroup } from '@erisfy/shadcnui-blocks';


interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      setTags([...tags, query.trim()]);
      setQuery('');
    }
  };

  const handleTagRemove = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search by ticker symbol or company name"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full"
      />
      <TagGroup className="mt-2">
        {tags.map((tag) => (
          <Tag key={tag} onRemove={() => handleTagRemove(tag)}>
            {tag}
          </Tag>
        ))}
      </TagGroup>
    </div>
  );
};

export { SearchBar };
