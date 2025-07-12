'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from './components/layout/sidebar'
import Header from './components/layout/header'
import { usePathname } from 'next/navigation'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const hidePaths = ['/auth/login']
  const shouldHidden = hidePaths.includes(pathname)
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <section className='flex h-screen bg-white relative overflow-hidden'>
          {!shouldHidden && <Sidebar role='admin' />}
          <main className='flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto w-full lg:w-auto'>
            {!shouldHidden && <Header role='admin'/>}
            {children}
          </main>
        </section>
      </body>
    </html>
  )
}