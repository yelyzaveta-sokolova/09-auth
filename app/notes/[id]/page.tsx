import type { Metadata } from 'next'
import { getNoteById } from '@/lib/api'
import NotePreview from '@/components/NotePreview/NotePreview'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await getNoteById(params.id)

  return {
    title: note.title,
    description: note.content.slice(0, 100),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 100),
      url: `https://your-vercel-url.vercel.app/notes/${params.id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  }
}

export default async function NotePage({ params }: Props) {
  const note = await getNoteById(params.id)

  return <NotePreview note={note} />
}
