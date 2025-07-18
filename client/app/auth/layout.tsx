'use client'

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <section className='flex h-screen bg-white relative overflow-hidden'>
            <main className='flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto w-full lg:w-auto'>
                {children}
            </main>
        </section>
    )
}