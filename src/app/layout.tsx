import './globals.css'
import type { Metadata } from 'next'
import Providers from './providers'


export const metadata: Metadata = {
  title: 'Guylii',
  description: 'Guylii app ',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='bg-slate-200'>
      <body className='bg-slate-200'>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
