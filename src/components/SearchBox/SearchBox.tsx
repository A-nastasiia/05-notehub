import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useDebouncedCallback(
    (value: string) => {
      onSearch(value);
    },
    800
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
};

export default SearchBox;