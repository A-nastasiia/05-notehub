import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';

import css from './NoteModal.module.css';

interface NoteModalProps {
  onClose: () => void;
  onSubmit: (values: { title: string; content?: string; tag: string }) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ onClose, onSubmit }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

document.addEventListener('keydown', handleEscape);
document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [ onClose ]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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