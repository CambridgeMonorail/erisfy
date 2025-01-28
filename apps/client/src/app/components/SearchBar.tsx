import { FC, useState } from 'react';
import { Input } from '@erisfy/shadcnui';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search by ticker symbol or company name"
        value={query}
        onChange={handleInputChange}
        className="w-full"
      />
    </div>
  );
};

export { SearchBar };
