'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { usePathname } from 'next/navigation'
import Header from './components/Layout/header'

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
        {!shouldHidden && <Header/>}
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}