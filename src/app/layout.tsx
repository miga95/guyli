import './globals.css'
import type { Metadata } from 'next'
import Providers from './providers'
import { ThemeProvider } from './theme/ThemeProvider'
import clsx from 'clsx'
import { Inter } from 'next/font/google'
import { NextFont } from 'next/dist/compiled/@next/font'
import { Header } from './components/Header'


export const metadata: Metadata = {
  title: 'Guylii',
  description: 'Guylii app ',
}

const inter : NextFont = Inter({subsets: ['latin']})

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='h-full'>
      <body className={clsx(inter.className, 'bg-background h-full')}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Providers>
            <div className='flex flex-col h-full'>
              <Header />
              <div className='flex-1 max-w-4xl m-auto py-12 w-full'>
               {children}
              </div>
            </div>
            </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
