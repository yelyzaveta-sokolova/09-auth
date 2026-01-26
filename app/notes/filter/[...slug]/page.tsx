import type { Metadata } from 'next'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client'

type Props = {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params
  const safeSlug = slug ?? ['all']

  const filter =
    safeSlug[0] === 'all'
      ? 'All notes'
      : `Filtered by ${safeSlug[0]}`

  return {
    title: `${filter} | NoteHub`,
    description: `Notes page ${filter.toLowerCase()} in NoteHub`,
    openGraph: {
      title: `${filter} | NoteHub`,
      description: `Notes page ${filter.toLowerCase()} in NoteHub`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const safeSlug = slug ?? ['all']
  const tag = safeSlug[0] === 'all' ? undefined : safeSlug[0]

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  )
}
