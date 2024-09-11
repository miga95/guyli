import './globals.css'
import type { Metadata } from 'next'
import Providers from './providers'
import { ThemeProvider } from './theme/ThemeProvider'
import clsx from 'clsx'
import { Inter } from 'next/font/google'
import { NextFont } from 'next/dist/compiled/@next/font'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Toaster } from "react-hot-toast";
import ProviderReactQuery from "@/ProviderReactQuery";

export const metadata: Metadata = {
  title: 'Socialwave',
  description: 'Mongolian Social platform',
}

// Configuration de la police
const inter : NextFont = Inter({ subsets: ['latin'] })


type LayoutProps = Partial<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>

export default function RootLayout({ children, modal }: LayoutProps) {
  return (
      <html lang="en" className='h-full'>
      <body className={clsx(inter.className, 'bg-background h-full')}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ProviderReactQuery>
          <Providers>
            <div className='flex flex-col h-full w-full'>
              <Header />
              <div className='flex-1 max-w-4xl m-auto py-12 w-full mx-auto'>
                <Toaster position="bottom-center" />
                      {children}
              </div>
              <Footer />
            </div>
            {modal}
          </Providers>
          </ProviderReactQuery>
      </ThemeProvider>
      </body>
      </html>
  )
}
