'use client'

import Sidebar from '@/app/components/ui/layout/sidebar'
import Header from '../components/ui/layout/header'

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <section className='flex h-screen bg-background relative overflow-hidden'>
            <Sidebar role='admin' />
            <main className='flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto w-full lg:w-auto'>
                <Header/>
                {children}
            </main>
        </section>
    )
}