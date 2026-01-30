'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';

export default function CreateNoteModal() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    mutation.mutate({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as string,
    });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Create note</h2>

        <input name="title" placeholder="Title" required />
        <textarea name="content" placeholder="Content" required />
        <input name="tag" placeholder="Tag" required />

        <button type="submit">Create</button>
        <button type="button" onClick={() => router.back()}>
          Close
        </button>
      </form>
    </div>
  );
}
