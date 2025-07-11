'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Sidebar() {
    const pathname = usePathname()

    const isActive = (path: string) =>
        pathname === path ? 'bg-white shadow-sm' : 'hover:bg-blue-200'

    const isBottomActive = (path: string) =>
        pathname === path ? 'text-blue-700' : 'text-gray-500'

    return (
        <>
            {/* Sidebar for desktop only */}
            <aside className="w-64 flex-col hidden lg:flex bg-white h-full fixed lg:relative z-50">
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
                    </div>
                </div>

                <nav className="bg-blue-100 p-4 flex-1 pt-5 relative rounded-se-4xl">
                    <div className="space-y-6 text-blue-900 font-semibold mt-8">
                        <Link
                            href="/"
                            className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/')}`}
                        >
                            <i className="bi bi-person-workspace text-xl w-6 text-center" />
                            <span className="ml-3">Dashboard</span>
                        </Link>
                        <Link
                            href="/history"
                            className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/history')}`}
                        >
                            <i className="bi bi-clock-history text-xl w-6 text-center" />
                            <span className="ml-3">History</span>
                        </Link>
                        <Link
                            href="/special"
                            className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/special')}`}
                        >
                            <i className="bi bi-asterisk text-xl w-6 text-center" />
                            <span className="ml-3">Special</span>
                        </Link>
                        <Link
                            href="/mandatory"
                            className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/mandatory')}`}
                        >
                            <i className="bi bi-archive-fill text-xl w-6 text-center" />
                            <span className="ml-3">Mandatory</span>
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Bottom navigation for mobile only */}
            <nav className="fixed bottom-0 left-0 w-full bg-white border-t z-50 flex justify-around items-center py-2 lg:hidden">
                <Link href="/" className="flex flex-col items-center text-xs">
                    <i className={`bi bi-person-workspace text-xl ${isBottomActive('/')}`} />
                    <span>Dashboard</span>
                </Link>
                <Link href="/history" className="flex flex-col items-center text-xs">
                    <i className={`bi bi-clock-history text-xl ${isBottomActive('/history')}`} />
                    <span>History</span>
                </Link>
                <Link href="/special" className="flex flex-col items-center text-xs">
                    <i className={`bi bi-asterisk text-xl ${isBottomActive('/special')}`} />
                    <span>Special</span>
                </Link>
                <Link href="/mandatory" className="flex flex-col items-center text-xs">
                    <i className={`bi bi-archive-fill text-xl ${isBottomActive('/mandatory')}`} />
                    <span>Mandatory</span>
                </Link>
            </nav>
        </>
    )
}
