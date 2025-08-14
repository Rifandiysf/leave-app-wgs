'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})



const initializeTheme = () => {
      try {
        const root = document.documentElement
        const theme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        const newTheme = theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : prefersDark ? 'dark' : 'light';
        root.classList.toggle('dark', newTheme === 'dark');

        const colors = localStorage.getItem('themeColors');
        if (colors) {
          const parsedColors = JSON.parse(colors);
          Object.entries(parsedColors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
          });
        }
      } catch (e) {
        console.error('Theme initialization error', e);
      }
    }

export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode
    }>) {
      const scriptContent = `(${initializeTheme.toString()})()`

  return (
  <html lang="en">
    <Head>
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
    </Head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </body>
  </html>
)
}