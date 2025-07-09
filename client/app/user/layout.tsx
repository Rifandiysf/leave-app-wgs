'use client'

import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)
  const isActive = (path: string) => pathname === path ? 'bg-white shadow-sm' : 'hover:bg-blue-200'

  return (
    <div className="flex h-screen bg-white relative overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`w-64 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:relative z-50 lg:z-auto h-full bg-white shadow-lg lg:shadow-none`}>

        <div className="bg-white p-7 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <Image
                src="/images/logo-wgs.svg"
                alt="Logo WGS"
                width={120}
                height={40}
                priority
              />
              <h2 className="text-2xl font-medium text-black mt-2">Welcome, User</h2>
            </div>
            <button
              onClick={closeSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i className="bi bi-x text-xl text-gray-600" />
            </button>
          </div>
        </div>

        <nav className="bg-blue-100 p-4 flex-1 pt-5 relative rounded-se-4xl">
          <div className="space-y-6 text-blue-900 font-semibold mt-8">
            {/* LINKS WITH onClick EVENT ADDED */}
            <Link href="/user/dashboard" onClick={closeSidebar} className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/user/dashboard')}`}>
              <i className="bi bi-person-workspace text-xl w-6 text-center" />
              <span className="ml-3">Dashboard</span>
            </Link>
            <Link href="/user/history" onClick={closeSidebar} className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/user/history')}`}>
              <i className="bi bi-clock-history text-xl w-6 text-center" />
              <span className="ml-3">History</span>
            </Link>
            <Link href="/user/special" onClick={closeSidebar} className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/user/special')}`}>
              <i className="bi bi-asterisk text-xl w-6 text-center" />
              <span className="ml-3">Special</span>
            </Link>
            <Link href="/user/mandatory" onClick={closeSidebar} className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/user/mandatory')}`}>
              <i className="bi bi-archive-fill text-xl w-6 text-center" />
              <span className="ml-3">Mandatory</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto w-full lg:w-auto">
        <header className="flex items-center justify-between mb-8 sm:mb-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="bi bi-list text-2xl text-gray-600" />
          </button>

          <div className="flex-1"></div>

          <div className="sm:hidden flex items-center space-x-2">
            <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
              <i className="bi bi-gear-fill text-lg text-gray-600 hover:text-blue-900" />
            </button>
            <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
              <i className="bi bi-box-arrow-right text-lg text-gray-600 hover:text-blue-900" />
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-6">

            {pathname === '/user/special' && (
              <div className="hidden sm:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-48"
                />
              </div>
            )}
            {/* Settings Button */}
            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
              <i className="bi bi-gear-fill text-xl" />
              <span className="text-sm font-medium">Settings</span>
            </div>

            {/* Logout Button */}
            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
              <i className="bi bi-box-arrow-right text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </div>
          </div>

        </header>

        {children}
      </main>
    </div>
  )
}