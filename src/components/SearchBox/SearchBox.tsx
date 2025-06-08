import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}
const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const debouncedSearch = useDebouncedCallback((query: string) => {
    onSearch(query); 
  }, 800);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
    debouncedSearch(newValue);
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