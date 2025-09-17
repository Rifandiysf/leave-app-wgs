'use client'

import React, { useEffect } from 'react';
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/lib/context/AppContext';
import { usePathname } from 'next/navigation';
import { getPageTitle } from '@/lib/utils';
import Head from 'next/head';

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
    const root = document.documentElement;
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const newTheme = theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : prefersDark ? 'dark' : 'light';
    root.classList.toggle('dark', newTheme === 'dark');

    const colors = localStorage.getItem('themeColors');

    if (colors) {
      const parsedColors: Record<string, string> = JSON.parse(colors);
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

  const pathName = usePathname()
  const pageTitle = getPageTitle(pathName)

  useEffect(() => {
    document.title = `${pageTitle} | Leave WGS`
  }, [pageTitle])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
