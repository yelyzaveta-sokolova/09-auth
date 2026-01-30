import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
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
    <html lang="en">
  <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
         </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  )
}
