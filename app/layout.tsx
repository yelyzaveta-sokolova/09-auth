import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub — зручний застосунок для створення та керування нотатками',
  openGraph: {
    title: 'NoteHub',
    description: 'NoteHub — зручний застосунок для створення та керування нотатками',
    url: 'https://your-vercel-url.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  )
}
