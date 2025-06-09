
import React, { useState } from "react";
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import { toast } from "react-hot-toast";

import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onMutate: (id) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      toast.success("Note deleted!");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      toast.error("Failed to delete note");
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  return notes.length === 0 ? (
    <p className={css.empty}>No notes found.</p> 
  ) : (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button
              className={css.button}
              onClick={() => mutate(id)}
              disabled={deletingId === id}
            >
              {deletingId === id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;