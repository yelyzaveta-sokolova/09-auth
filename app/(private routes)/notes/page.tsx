'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { fetchNotes } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import NoteItem from '@/components/NoteItem/NoteItem';

import css from './Notes.module.css';

export default function NotesPage() {
  const { data: notes, isLoading, isError } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading notes</p>;
  }

  return (
    <main className={css.mainContent}>
      <Link href="/notes/new" className={css.createLink}>
        Create note
      </Link>

      <ul className={css.list}>
        {notes?.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ul>
    </main>
  );
}
