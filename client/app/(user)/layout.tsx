'use client'

import { Geist, Geist_Mono } from 'next/font/google'
// import './globals.css'
import Sidebar from '@/app/components/layout/sidebar'
import Header from '../components/layout/header'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <section className='flex h-screen bg-white relative overflow-hidden'>
                    <Sidebar role='user' />
                    <main className='flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto w-full lg:w-auto'>
                        <Header role='user' />
                        {children}
                    </main>
                </section>
            </body>
        </html>
    )
}