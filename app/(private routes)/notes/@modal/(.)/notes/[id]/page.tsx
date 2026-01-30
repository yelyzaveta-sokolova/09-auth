'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


type Props = {
  params: {
    id: string;
  };
};

export default function NoteModal({ params }: Props) {
  const router = useRouter();

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  if (isLoading) return <p>Loading...</p>;

  if (!note) return null;

  return (
    <div className="modal">
      <h2>
  <Link href={`/notes/${note.id}`}>{note.title}</Link>
</h2>

      <p>{note.content}</p>
      <p>#{note.tag}</p>

      <button onClick={() => router.back()}>Close</button>
    </div>
  );
}
