'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import 'bootstrap-icons/font/bootstrap-icons.css'

type SidebarProps = {
    isOpen: boolean
    onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()
    const isActive = (path: string) => pathname === path ? 'bg-white shadow-sm' : 'hover:bg-blue-200'

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`w-64 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
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
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <i className="bi bi-x text-xl text-gray-600" />
                        </button>
                    </div>
                </div>

                <nav className="bg-blue-100 p-4 flex-1 pt-5 relative rounded-se-4xl">
                    <div className="space-y-6 text-blue-900 font-semibold mt-8">
                        <Link href="/dashboard" onClick={onClose} className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/dashboard')}`}>
                            <i className="bi bi-person-workspace text-xl w-6 text-center" />
                            <span className="ml-3">Dashboard</span>
                        </Link>
                        <Link href="/history" onClick={onClose} className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/history')}`}>
                            <i className="bi bi-clock-history text-xl w-6 text-center" />
                            <span className="ml-3">History</span>
                        </Link>
                        <Link href="/special" onClick={onClose} className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/special')}`}>
                            <i className="bi bi-asterisk text-xl w-6 text-center" />
                            <span className="ml-3">Special</span>
                        </Link>
                        <Link href="/mandatory" onClick={onClose} className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/mandatory')}`}>
                            <i className="bi bi-archive-fill text-xl w-6 text-center" />
                            <span className="ml-3">Mandatory</span>
                        </Link>
                    </div>
                </nav>
            </aside>
        </>
    )
}
