import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onSearch }) => {
  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch(value);
  }, 800);

  useEffect(() => {
    debouncedSearch(value);
  }, [value, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default SearchBox;