'use client'

import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActiveSidebar = (path: string) => pathname === path ? 'bg-white shadow-sm' : 'hover:bg-blue-200'
  const isActiveBottomBar = (path: string) => pathname === path ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'

  return (
    <div className="flex h-screen bg-white">
      
      {/* ===== SIDEBAR (Hanya untuk Desktop) ===== */}
      <aside className="hidden lg:flex w-64 flex-col bg-white">
        <div className="p-7 pb-3">
          <div className="flex items-center">
            <div>
              <Image src="/images/logo-wgs.webp" alt="Logo WGS" width={120} height={40} priority />
              <h2 className="text-2xl font-medium text-black mt-2">Welcome, User</h2>
            </div>
          </div>
        </div>
        <nav className="bg-blue-100 p-4 flex-1 pt-5 relative rounded-se-4xl">
          <div className=" text-black font-semibold mt-8">
            <Link href="/user/dashboard" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActiveSidebar('/user/dashboard')}`}>
              <i className="bi bi-person-workspace text-xl w-6 text-center" />
              <span className="ml-3">Dashboard</span>
            </Link>
            <div className=" h-px bg-gray-500 mt-4 mb-2" />
            <Link href="/user/history" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActiveSidebar('/user/history')}`}>
              <i className="bi bi-clock-history text-xl w-6 text-center" />
              <span className="ml-3">History</span>
            </Link>
            <Link href="/user/special" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActiveSidebar('/user/special')}`}>
              <i className="bi bi-asterisk text-xl w-6 text-center" />
              <span className="ml-3">Special</span>
            </Link>
            <Link href="/user/mandatory" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActiveSidebar('/user/mandatory')}`}>
              <i className="bi bi-archive-fill text-xl w-6 text-center" />
              <span className="ml-3">Mandatory</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* ===== KONTEN UTAMA ===== */}
      <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto pb-24 lg:pb-10">
        {/* --- Header untuk Mobile --- */}
        <header className="lg:hidden flex items-center justify-between mb-6 px-2">
            <div>
                <Image src="/images/logo-wgs.webp" alt="Logo WGS" width={90} height={30} priority />
                 <h2 className="text-xl font-medium text-black">Welcome, User</h2>
            </div>
            <button className="p-2" onClick={() => setIsMobileMenuOpen(true)}>
                <i className="bi bi-list text-3xl text-gray-700"></i>
            </button>
        </header>

        {/* --- Header untuk Desktop --- */}
        <header className="hidden lg:flex items-center justify-between mb-8">
          {/* Bagian Kiri: Search Bar */}
          <div>
            {/* MODIFIKASI DI SINI: Menambahkan tanda kurung */}
            {(pathname === '/user/special' || pathname === '/user/history') && (
              <div className="relative">
                <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-2xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
                />
              </div>
            )}
          </div>

          {/* Bagian Kanan: Tombol-tombol */}
          <div className="flex items-center space-x-6">
            <Link href="/admin/dashboard" className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
              <i className="bi bi-person-workspace text-xl" />
              <span className="text-sm font-medium">Admin Side</span>
            </Link>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
              <i className="bi bi-gear-fill text-xl" />
              <span className="text-sm font-medium">Settings</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
              <i className="bi bi-box-arrow-right text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </div>
          </div>
        </header>
        
        {children}
      </main>

      {/* ===== BOTTOM NAVIGATION BAR (Hanya untuk Mobile) ===== */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white flex justify-around items-center h-16 shadow-[0_-2px_5px_rgba(0,0,0,0.1)] z-40">
        <Link href="/user/dashboard" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActiveBottomBar('/user/dashboard')}`}>
          <i className="bi bi-person-workspace text-2xl"></i>
          {pathname === '/user/dashboard' && <span className="h-1 w-6 bg-blue-600 rounded-full mt-1"></span>}
        </Link>
        <Link href="/user/history" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActiveBottomBar('/user/history')}`}>
          <i className="bi bi-clock-history text-2xl"></i>
          {pathname === '/user/history' && <span className="h-1 w-6 bg-blue-600 rounded-full mt-1"></span>}
        </Link>
        <Link href="/user/special" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActiveBottomBar('/user/special')}`}>
          <i className="bi bi-asterisk text-2xl"></i>
          {pathname === '/user/special' && <span className="h-1 w-6 bg-blue-600 rounded-full mt-1"></span>}
        </Link>
        <Link href="/user/mandatory" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActiveBottomBar('/user/mandatory')}`}>
          <i className="bi bi-archive-fill text-2xl"></i>
          {pathname === '/user/mandatory' && <span className="h-1 w-6 bg-blue-600 rounded-full mt-1"></span>}
        </Link>
      </nav>

      {/* ===== MENU SETTINGS & LOGOUT (Hanya untuk Mobile) ===== */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="lg:hidden fixed top-4 right-4 w-56 bg-white rounded-lg shadow-xl z-50 p-3 animate-fade-in-down">
            <div className="flex justify-between items-center mb-2 pb-2 border-b">
              <h3 className="font-bold text-gray-800 ml-2">Menu</h3>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded-full hover:bg-gray-200">
                <i className="bi bi-x text-xl text-gray-600"></i>
              </button>
            </div>
            <div className="flex flex-col space-y-1 mt-2">
              <div className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <i className="bi bi-person-workspace text-gray-700" />
                <span className="font-medium text-gray-700">Admin Side   </span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <i className="bi bi-gear-fill text-lg text-gray-700" />
                <span className="font-medium text-gray-700">Settings</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <i className="bi bi-box-arrow-right text-lg text-gray-700" />
                <span className="font-medium text-gray-700">Logout</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}