'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect } from 'react'
import { useAppContext } from '@/lib/context/AppContext'

const SidebarSkeleton = () => (
    <aside className="w-64 flex-col hidden lg:flex bg-background h-full fixed lg:relative z-50 animate-pulse">
        <div className="bg-background p-7 pb-3">
            <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="w-48 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <nav className="bg-card p-4 flex-1 relative rounded-se-4xl">
            <div className="font-semibold mt-8 space-y-2">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="!my-4 h-px bg-gray-400 dark:bg-gray-600" />
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
        </nav>
    </aside>
);

export default function Sidebar() {
    const pathname = usePathname();
    const { fetchUserData, fetchSetting } = useAppContext();
    const { user, isUserLoading, settingImage } = useAppContext();

    useEffect(() => {
        fetchSetting();
        fetchUserData();
    }, [])

    const isActive = (path: string) => pathname === path ? 'bg-background shadow-sm' : 'hover:bg-blue-200 hover:dark:bg-blue-900';
    const isBottomActive = (path: string) => pathname === path ? 'text-blue-700' : 'text-gray-500';

    const broadcastResetView = () => {
        window.dispatchEvent(new CustomEvent('resetLeaveView'));
    };

    if (isUserLoading) {
        return <SidebarSkeleton />;
    }

    const welcomeText = `Welcome, ${user?.fullname || 'Guest'}`;
    const isAdmin = user?.role?.slug === 'admin' || user?.role?.slug === 'super_admin';

    const showAdminSidebar = isAdmin && pathname.startsWith('/admin');

    return (
        <>
            {showAdminSidebar ? (
                <>
                    {/* ============== SIDEBAR ADMIN (DESKTOP) ============== */}
                    <aside className="w-64 flex-col hidden lg:flex bg-background h-full fixed lg:relative z-50">
                        <div className="bg-background p-7 pb-3">
                            <div>
                                {settingImage && (
                                    <Image src={settingImage} alt="Logo WGS" width={90} height={90} priority />
                                )}
                                <h2 className="text-2xl font-medium text-foreground mt-2 whitespace-nowrap">{welcomeText}</h2>
                            </div>
                        </div>
                        <nav className="bg-card p-4 flex-1 relative rounded-se-4xl">
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
                                <Link href="/admin/adjust-balance" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/adjust-balance')}`}>
                                    <i className="bi bi-window-plus text-xl w-6 text-center" />
                                    <span className="ml-3">Adjust Balance</span>
                                </Link>
                                <Link href="/admin/adjust-history" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/adjust-history')}`}>
                                    <i className="bi bi-journal-bookmark text-xl w-6 text-center" />
                                    <span className="ml-3">Adjust History</span>
                                </Link>
                                <Link href="/admin/information" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/admin/information')}`}>
                                    <i className="bi bi-info-circle text-xl w-6 text-center" />
                                    <span className="ml-3">Information</span>
                                </Link>
                            </div>
                        </nav>
                    </aside>

                    {/* ============== BOTTOM BAR ADMIN (MOBILE) ============== */}
                    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-card border-t z-50 flex justify-around overflow-x-auto lg:hidden">
                        <div className="flex flex-nowrap items-start px-2">
                            <Link href="/admin/dashboard" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/dashboard')}`}>
                                <i className="bi bi-person-workspace text-xl" />
                                <span className="text-[10px] leading-tight mt-1">Dashboard</span>
                            </Link>
                            <Link href="/admin/employee-list" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/employee-list')}`}>
                                <i className="bi bi-person-circle text-xl" />
                                <span className="text-[10px] leading-tight mt-1">Employee List</span>
                            </Link>
                            <Link href="/admin/list-leave" onClick={broadcastResetView} className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/list-leave')}`}>
                                <i className="bi bi-clock-history text-xl" />
                                <span className="text-[10px] leading-tight mt-1">List Of Leave</span>
                            </Link>
                            <Link href="/admin/special-leave" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/special-leave')}`}>
                                <i className="bi bi-asterisk text-xl" />
                                <span className="text-[10px] leading-tight mt-1">Special Leave</span>
                            </Link>
                            <Link href="/admin/mandatory" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/mandatory')}`}>
                                <i className="bi bi-archive-fill text-xl" />
                                <span className="text-[10px] leading-tight mt-1">Mandatory</span>
                            </Link>
                            <Link href="/admin/adjust-balance" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/adjust-balance')}`}>
                                <i className="bi bi-window-plus text-xl" />
                                <span className="text-[10px] leading-tight mt-1">Adjust Balance</span>
                            </Link>
                            <Link href="/admin/adjust-history" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/adjust-history')}`}>
                                <i className="bi bi-journal-bookmark text-xl" />
                                <span className="text-[10px] leading-tight mt-1">Adjust History</span>
                            </Link>
                            <Link href="/admin/information" className={`flex flex-col items-center text-center h-full pt-2 px-3 min-w-[85px] ${isBottomActive('/admin/information')}`}>
                                <i className="bi bi-info-circle text-xl" />
                                <span className="text-[10px] leading-tight mt-1">Information</span>
                            </Link>
                        </div>
                    </nav>
                </>
            ) : (
                <>
                    {/* ============== SIDEBAR USER (DESKTOP) ============== */}
                    <aside className="w-64 flex-col hidden lg:flex bg-background h-screen sticky top-0">
                        <div className="bg-background p-7 pb-3">
                            <div>
                                {settingImage && (
                                    <Image src={settingImage} alt="Logo WGS" width={90} height={90} priority />
                                )}
                                <h2 className="text-2xl font-medium text-foreground mt-2 whitespace-nowrap">{welcomeText}</h2>
                            </div>
                        </div>
                        <nav className="bg-card p-4 flex-1 pt-5 relative rounded-se-4xl">
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
                                <Link href="/adjust-history" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/adjust-history')}`}>
                                    <i className="bi bi-journal-bookmark text-xl w-6 text-center" />
                                    <span className="ml-3">Adjust History</span>
                                </Link>
                                <Link href="/information" className={`flex items-center py-3 px-6 rounded-full transition-colors ${isActive('/information')}`}>
                                    <i className="bi bi-info-circle text-xl w-6 text-center" />
                                    <span className="ml-3">Information</span>
                                </Link>
                            </div>
                        </nav>
                    </aside>

                    {/* ============== SIDEBAR USER (MOBILE) ============== */}
                    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-card border-t z-50 flex justify-around items-center py-2 lg:hidden">
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
                        <Link href="/adjust-history" className={`flex flex-col items-center text-xs ${isBottomActive('/adjust-history')}`}>
                            <i className={`bi bi-journal-bookmark text-xl`} />
                            <span>Adjust History</span>
                        </Link>
                        <Link href="/information" className={`flex flex-col items-center text-xs ${isBottomActive('/information')}`}>
                            <i className={`bi bi-info-circle text-xl`} />
                            <span>Information</span>
                        </Link>
                    </nav>
                </>
            )}
        </>
    )
}