import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import type { CreateNoteRequest } from '../../types/note';
import css from './NoteModal.module.css';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CreateNoteRequest) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, onSubmit }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm onSubmit={onSubmit} onCancel={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;