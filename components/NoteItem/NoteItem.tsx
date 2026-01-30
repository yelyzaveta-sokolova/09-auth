'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';
import { Note } from '@/types/note';
import css from './NoteItem.module.css';

type Props = {
  note: Note;
};

export default function NoteItem({ note }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <li className={css.listItem}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>#{note.tag}</p>

      <button onClick={() => mutation.mutate(note.id)}>Delete</button>
    </li>
  );
}
