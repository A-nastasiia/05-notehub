
import { useState, useCallback } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import NoteModal from '../NoteModal/NoteModal';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import type { Note } from '../../types/note';

import css from "./App.module.css";


interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const App: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, error } = useQuery<NotesResponse, Error>({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = useCallback((newValue: string) => {
    setSearch(newValue);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={handleSearchChange}
        />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create Note +
        </button>
      </header>

      {isLoading && <p className={css.status}>Loading...</p>}
      {isError && (
        <p className={css.status}>
          Error: {error?.message ?? "Unknown error"}
        </p>
      )}

      {data && <NoteList notes={data.notes} />}

      {isModalOpen && <NoteModal onClose={closeModal} />}
    </div>
  );
};

export default App;