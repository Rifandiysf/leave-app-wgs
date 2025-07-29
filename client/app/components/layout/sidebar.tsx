'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react'

type sideBarProps = {
    role?: "admin" | "user" | "super_admin"
}

export default function Sidebar({ role = "user", }: sideBarProps) {
    const pathname = usePathname()
    const [welcomeText, setWelcomeText] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token.includes('.')) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]))
                const name = payload?.fullname || (role === 'admin' ? 'Admin' : 'User');
                setWelcomeText(`Welcome, ${name}`);
            } catch (e) {
                 setWelcomeText(role === 'admin' ? 'Welcome, Admin' : 'User');
            }
        } else {
            setWelcomeText(role === 'admin' ? 'Welcome, Admin' : 'User');
        }
    }, [role]);

    const isActive = (path: string) => pathname === path ? 'bg-white shadow-sm' : 'hover:bg-blue-200'
    const isBottomActive = (path: string) => pathname === path ? 'text-blue-700' : 'text-gray-500'

    // Fungsi broadcast tidak berubah
    const broadcastResetView = () => {
        window.dispatchEvent(new CustomEvent('resetLeaveView'));
    };

    return (
        <>
            {role === "admin" ? (
                <>
                    {/* Sidebar Desktop Admin (tidak diubah) */}
                    <aside className="w-64 flex-col hidden lg:flex bg-white h-full fixed lg:relative z-50">
                        <div className="bg-white p-7 pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Image src="/images/logo-wgs.svg" alt="Logo WGS" width={120} height={40} priority />
                                    <h2 className="text-2xl font-medium text-black mt-2 truncate">{welcomeText}</h2>
                                </div>
                            </div>
                        </div>
                        <nav className="bg-blue-100 p-4 flex-1 relative rounded-se-4xl">
                            <div className="font-semibold mt-8 space-y-2">
                               
                                <Link href="/admin/dashboard" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/dashboard')}`}>
                                    <i className="bi bi-person-workspace text-xl w-6 text-center" />
                                    <span className="ml-3">Dashboard</span>
                                </Link>
                                 <div className="!my-4 h-px bg-gray-400" />
                                <Link href="/admin/employee-list" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/employee-list')}`}>
                                    <i className="bi bi-person-circle text-xl w-6 text-center" />
                                    <span className="ml-3">Employee List</span>
                                </Link>
                                <Link href="/admin/list-leave" onClick={broadcastResetView} className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/list-leave')}`}>
                                    <i className="bi bi-clock-history text-xl w-6 text-center" />
                                    <span className="ml-3">List Of Leave</span>
                                </Link>
                                <Link href="/admin/special-leave" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/special-leave')}`}>
                                    <i className="bi bi-asterisk text-xl w-6 text-center" />
                                    <span className="ml-3">Special Leave</span>
                                </Link>
                                <Link href="/admin/mandatory" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/mandatory')}`}>
                                    <i className="bi bi-archive-fill text-xl w-6 text-center" />
                                    <span className="ml-3">Mandatory</span>
                                </Link>
                                <Link href="/admin/amount-leave" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/amount-leave')}`}>
                                    <i className="bi bi-window-plus text-xl w-6 text-center" />
                                    <span className="ml-3">Amount Leave</span>
                                </Link>
                            </div>
                        </nav>
                    </aside>

                    {/* === BAGIAN YANG DIRAPIKAN (BOTTOM BAR ADMIN) === */}
                    <nav className="fixed bottom-0 left-0 w-full bg-white border-t z-50 flex items-start h-17 lg:hidden">
                        <Link href="/admin/dashboard" className={`flex flex-col items-center text-center flex-1 h-full pt-2 px-1 ${isBottomActive('/admin/dashboard')}`}>
                            <i className="bi bi-person-workspace text-xl" />
                            <span className="text-[10px] leading-tight mt-1">Dashboard</span>
                        </Link>
                        <Link href="/admin/employee-list" className={`flex flex-col items-center text-center flex-1 h-full pt-2 px-1 ${isBottomActive('/admin/employee-list')}`}>
                            <i className="bi bi-person-circle text-xl" />
                            <span className="text-[10px] leading-tight mt-1">Employee List</span>
                        </Link>
                        <Link href="/admin/list-leave" onClick={broadcastResetView} className={`flex flex-col items-center text-center flex-1 h-full pt-2 px-1 ${isBottomActive('/admin/list-leave')}`}>
                            <i className="bi bi-clock-history text-xl" />
                            <span className="text-[10px] leading-tight mt-1">List Of Leave</span>
                        </Link>
                        <Link href="/admin/special-leave" className={`flex flex-col items-center text-center flex-1 h-full pt-2 px-1 ${isBottomActive('/admin/special-leave')}`}>
                            <i className="bi bi-asterisk text-xl" />
                            <span className="text-[10px] leading-tight mt-1">Special Leave</span>
                        </Link>
                        <Link href="/admin/mandatory" className={`flex flex-col items-center text-center flex-1 h-full pt-2 px-1 ${isBottomActive('/admin/mandatory')}`}>
                            <i className="bi bi-archive-fill text-xl" />
                            <span className="text-[10px] leading-tight mt-1">Mandatory</span>
                        </Link>
                        <Link href="/admin/amount-leave" className={`flex flex-col items-center text-center flex-1 h-full pt-2 px-1 ${isBottomActive('/admin/amount-leave')}`}>
                            <i className="bi bi-window-plus text-xl" />
                            <span className="text-[10px] leading-tight mt-1">Amount Leave</span>
                        </Link>
                    </nav>
                </>
            ) : (
                <>
                    {/* Sidebar & Bottom Bar User (tidak diubah) */}
                    <aside className="w-64 flex-col hidden lg:flex bg-white h-full fixed lg:relative z-50">
                        <div className="bg-white p-7 pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Image src="/images/logo-wgs.svg" alt="Logo WGS" width={120} height={40} priority />
                                    <h2 className="text-2xl font-medium text-black mt-2 truncate">{welcomeText}</h2>
                                </div>
                            </div>
                        </div>
                        <nav className="bg-blue-100 p-4 flex-1 pt-5 relative rounded-se-4xl">
                            <div className="font-semibold mt-8 space-y-2">
                                <Link href="/" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/')}`}>
                                    <i className="bi bi-person-workspace text-xl w-6 text-center" />
                                    <span className="ml-3">Dashboard</span>
                                </Link>
                                <div className="!my-4 h-px bg-gray-400" />
                                <Link href="/history" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/history')}`}>
                                    <i className="bi bi-clock-history text-xl w-6 text-center" />
                                    <span className="ml-3">History</span>
                                </Link>
                                <Link href="/mandatory" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/mandatory')}`}>
                                    <i className="bi bi-archive-fill text-xl w-6 text-center" />
                                    <span className="ml-3">Mandatory</span>
                                </Link>
                            </div>
                        </nav>
                    </aside>
                    <nav className="fixed bottom-0 left-0 w-full bg-white border-t z-50 flex justify-around items-center py-2 lg:hidden">
                        <Link href="/" className={`flex flex-col items-center text-xs ${isBottomActive('/')}`}>
                            <i className={`bi bi-person-workspace text-xl`} />
                            <span>Dashboard</span>
                        </Link>
                        <Link href="/history" className={`flex flex-col items-center text-xs ${isBottomActive('/history')}`}>
                            <i className={`bi bi-clock-history text-xl`} />
                            <span>History</span>
                        </Link>
                        <Link href="/mandatory" className={`flex flex-col items-center text-xs ${isBottomActive('/mandatory')}`}>
                            <i className={`bi bi-archive-fill text-xl`} />
                            <span>Mandatory</span>
                        </Link>
                    </nav>
                </>
            )}
        </>
    )
}