import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page not found | NoteHub',
  description: 'The page you are looking for does not exist in NoteHub.',
  openGraph: {
    title: '404 — Page not found | NoteHub',
    description: 'The page you are looking for does not exist in NoteHub.',
    url: 'https://your-vercel-url.vercel.app/404',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
}

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you&#39;re looking for doesn&#39;t exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  )
}

export default NotFound
