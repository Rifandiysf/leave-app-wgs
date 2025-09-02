'use client'

import React from 'react'
import Sidebar from '@/app/components/ui/layout/sidebar'
import Header from '@/app/components/ui/layout/header'

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <section className="flex min-h-screen">
      <Sidebar /> 
      <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto w-full lg:w-auto">
        <Header />
        {children}
      </main>
    </section>
  )
}