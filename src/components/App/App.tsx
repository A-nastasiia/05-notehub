import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, createNote, deleteNote } from '../../services/noteService';
import type { CreateNoteRequest } from '../../types/note';
import NoteList from '../NoteList/NoteList';
import NoteModal from '../NoteModal/NoteModal';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';

import css from "./App.module.css";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: notesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notes', currentPage, searchQuery],
    queryFn: () => fetchNotes({ 
      page: currentPage, 
      perPage: 12, 
      search: searchQuery 
    }),
    staleTime: 5 * 60 * 1000,
  });

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false);
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); 
  };

  const handleCreateNote = (noteData: CreateNoteRequest) => {
    createNoteMutation.mutate(noteData);
  };

  const handleDeleteNote = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div className={css.app}>Loading...</div>;
  }

  if (error) {
    return <div className={css.app}>Error loading notes</div>;
  }

  const notes = notesData?.notes || [];
  const totalPages = notesData?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      <NoteList notes={notes} onDeleteNote={handleDeleteNote} />

      <NoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleCreateNote}
      />
    </div>
  );
};

export default App;