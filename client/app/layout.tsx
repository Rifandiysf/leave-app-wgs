'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
// import Sidebar from './components/layout/sidebar'
// import Header from './components/layout/header'
// import { usePathname } from 'next/navigation'
// import { useEffect, useState } from 'react'

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
  // const pathname = usePathname()
  // const hidePaths = ['/auth/login']
  // const shouldHidden = hidePaths.includes(pathname)
  // const [role, setRole] = useState("")

  // useEffect(() => {
  //   const storeRole = sessionStorage.getItem('user')
  //   if (storeRole) {
  //     const user = JSON.parse(storeRole)
  //     setRole(user.role)
  //   }
  // },[])
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <section className={''}>
          {/* {!shouldHidden && <Sidebar role={role === 'admin' ? "admin" : "user"} />} */}
          <main className=''>
            {/* {!shouldHidden && <Header role={role === 'admin' ? "admin" : "user"}/>} */}
            {children}
          </main>
        </section>
      </body>
    </html>
  )
}