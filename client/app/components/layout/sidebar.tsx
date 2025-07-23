'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react'

type sideBarProps = {
    role?: "admin" | "user" | "super_admin"
}

const broadcastResetView = () => {
  window.dispatchEvent(new CustomEvent('resetLeaveView'));
};


export default function Sidebar({ role = "user" }: sideBarProps) {
    const pathname = usePathname()
    const [welcomeText, setWelcomeText] = useState("Welcome...")

    useEffect(() => {

        const userSession = sessionStorage.getItem('user');
        if (userSession) {
            const userData = JSON.parse(userSession);

            const name = userData.fullname || (role === 'admin' ? 'Admin' : 'User');
            setWelcomeText(`Welcome, ${name}`);
        } else {
            setWelcomeText("Welcome, Guest");
        }
    }, [role]);

    const isActive = (path: string) => pathname === path ? 'bg-white shadow-sm' : 'hover:bg-blue-200'
    const isBottomActive = (path: string) => pathname === path ? 'text-blue-700' : 'text-gray-500'
    return (
        <>
            {role === "admin" ? (
                <>
                    <aside className="w-64 flex-col hidden lg:flex bg-white h-full fixed lg:relative z-50">
                        <div className="bg-white p-7 pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Image src="/images/logo-wgs.svg" alt="Logo WGS" width={120} height={40} priority />
                                    <h2 className="text-2xl font-medium text-black mt-2 truncate">Welcome Admin</h2>
                                </div>
                            </div>
                        </div>

                        <nav className="bg-blue-100 p-4 flex-1 relative rounded-se-4xl">
                            <div className=" font-semibold">
                                <Link
                                    href="/admin/dashboard"
                                    className={`flex items-center py-3 px-6 rounded-full transition-colors mt-10    ${isActive('/admin/dashboard')}`}
                                >
                                    <i className="bi bi-person-workspace text-xl w-6 text-center" />
                                    <span className="ml-3">Dashboard</span>
                                </Link>
                                <div className="mt-2 h-px bg-gray-500 mb-2  " />
                             
                                <Link
                                    href="/admin/employee-list"
                                    className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/employee-list')}`}>
                                    <i className="bi bi-person-circle text-xl w-6 text-center" />
                                    <span className="ml-3">Employee List</span>
                                </Link>
                                <Link
                                    href="/admin/list-leave"
                                    onClick={broadcastResetView}
                                    className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/list-leave')}`}
                                >
                                    <i className="bi bi-clock-history text-xl w-6 text-center" />
                                    <span className="ml-3">List Of Leave</span>
                                </Link>
                                <Link href="/admin/special-leave" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/special-leave')}`}>
                                    <i className="bi bi-card-checklist text-xl w-6 text-center" />
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

                    <nav className="fixed bottom-0 left-0 w-full bg-white border-t z-50 flex justify-around items-center py-2 lg:hidden">
                        <Link href="/admin/dashboard" className="flex flex-col items-center text-xs">
                            <i className={`bi bi-person-workspace text-xl ${isBottomActive('/admin/dashboard')}`} />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            href="/admin/list-leave"
                            onClick={broadcastResetView}
                            className="flex flex-col items-center text-xs"
                        >
                            <i className={`bi bi-clock-history text-xl ${isBottomActive('/admin/list-leave')}`} />
                            <span>List Of Leave</span>
                        </Link>
                        <Link href="/admin/amount-leave" className="-mt-8">
                            <div className="w-20 h-20 bg-blue-600 rounded-full flex flex-col justify-center items-center shadow-lg transform hover:scale-105 transition-transform">
                                <i className="bi bi-calendar-plus text-2xl text-white"></i>
                                <span className="text-white text-[10px] font-bold mt-1">Amount Leave</span>
                            </div>
                        </Link>
                        <Link href="/admin/mandatory" className="flex flex-col items-center text-xs">
                            <i className={`bi bi-asterisk text-xl ${isBottomActive('/admin/mandatory')}`} />
                            <span>Mandatory</span>
                        </Link>
                        <Link href="/admin/special-leave" className="flex flex-col items-center text-xs">
                            <i className={`bi bi-archive-fill text-xl ${isBottomActive('/admin/special-leave')}`} />
                            <span>Special Leave</span>
                        </Link>

                    </nav>
                </>
            ) : (
                <>
                    <aside className="w-64 flex-col hidden lg:flex bg-white h-full fixed lg:relative z-50">
                        <div className="bg-white p-7 pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Image src="/images/logo-wgs.svg" alt="Logo WGS" width={120} height={40} priority />
                                    <h2 className="text-2xl font-medium text-black mt-2 truncate">Welcome User</h2>
                                </div>
                            </div>
                        </div>

                        <nav className="bg-blue-100 p-4 flex-1 pt-5 relative rounded-se-4xl">
                            <div className=" font-semibold mt-8">
                                <Link href="/" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/')}`}>
                                    <i className="bi bi-person-workspace text-xl w-6 text-center" />
                                    <span className="ml-3">Dashboard</span>
                                </Link>
                                <div className="mt-4 h-px bg-gray-500 mb-2" />
                                <Link href="/history" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/history')}`}>
                                    <i className="bi bi-clock-history text-xl w-6 text-center" />
                                    <span className="ml-3">History</span>
                                </Link>
                                <Link href="/special" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/special')}`}>
                                    <i className="bi bi-asterisk text-xl w-6 text-center" />
                                    <span className="ml-3">Special</span>
                                </Link>
                                <Link href="/mandatory" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/mandatory')}`}>
                                    <i className="bi bi-archive-fill text-xl w-6 text-center" />
                                    <span className="ml-3">Mandatory</span>
                                </Link>

                            </div>
                        </nav>
                    </aside>

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
            )}
        </>
    )
}