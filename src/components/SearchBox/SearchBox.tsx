
import React, { type ChangeEvent, useEffect } from "react";
import { useDebounce } from "use-debounce";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (searchText: string) => void;
  onChange: (newValue: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onSearch, onChange }) => {
  const [debouncedValue] = useDebounce(value, 500);

  useEffect(() => {
    onSearch(debouncedValue.trim());
  }, [debouncedValue, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};

export default SearchBox;