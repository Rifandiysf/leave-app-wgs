
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Modal from '@/app/components/ui/Modal/Modal'
import Cookies from 'js-cookie'
import SettingModal from '../Modal/Setting'
import { logoutUser } from '@/lib/api/service/user'
import { useAppContext } from '@/lib/context/AppContext'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { user, isUserLoading, settingImage } = useAppContext();

    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.error('Logout API call failed, but proceeding with client-side logout.', err)
        } finally {
            Cookies.remove('Authorization', { path: '/' });
            Cookies.remove('device-id', { path: '/' });
            router.push('/auth/login');
        }
    }

    const isUserDashboard = pathname === '/' || pathname === '/history' || pathname === '/mandatory' || pathname === '/adjust-history' || pathname === '/information';
    const isAdminPage = pathname.startsWith('/admin')

    if (isUserLoading) {
        // Tampilkan skeleton loading sederhana saat data user sedang diambil oleh context
        return (
            <header className="flex items-center justify-between lg:bg-transparent lg:p-0">
                <div className="lg:hidden">
                    <div className="w-36 h-9 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                    <div className="w-48 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="flex-1 hidden lg:block"></div>
                <div className="hidden lg:flex items-center space-x-6">
                    <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                    <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>
            </header>
        );
    }

    const fullname = user?.fullname || 'Guest';
    const userRole = user?.role?.slug || '';
    const isAdmin = userRole === 'admin' || userRole === 'super_admin';

    return (
        <header className="flex items-center justify-between lg:bg-transparent lg:p-0">
            <div className="lg:hidden">
                {settingImage && (
                    <Image src={settingImage} alt="Logo WGS" width={90} height={90} priority />
                )}
                <h2 className="text-xl font-medium text-foreground truncate mt-1">Welcome {fullname}</h2>
            </div>

            <div className="flex-1 hidden lg:block"></div>

            <div className="lg:hidden">
                <button onClick={() => setIsMenuOpen(true)} className="p-1.5">
                    <i className="bi bi-list text-2xl text-foreground" />
                </button>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)}>
                    <div className="fixed top-4 right-4 w-60 dark:bg-card bg-background rounded-xl shadow-lg z-50 p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-foreground">Menu</h3>
                            <button onClick={() => setIsMenuOpen(false)} className="p-1">
                                <i className="bi bi-x text-xl text-foreground" />
                            </button>
                        </div>
                        <div className="h-px bg-gray-500 mb-4" />
                        <nav className="flex flex-col">
                            {isAdmin && isAdminPage && (
                                <Link href="/" className="flex items-center space-x-3 p-2 rounded-lg dark:hover:bg-foreground/20 transition-colors">
                                    <i className="bi bi-box-arrow-in-left text-[24px] ml-[2px]" />
                                    <span className="font-medium text-foreground">Employee Side</span>
                                </Link>
                            )}
                            {isAdmin && isUserDashboard && (
                                <Link href="/admin/dashboard" className="flex items-center space-x-4 p-2 rounded-lg dark:hover:bg-foreground/20 transition-colors">
                                    <i className="bi bi-person-workspace text-xl" />
                                    <span className="font-medium text-foreground">Admin Side</span>
                                </Link>
                            )}

                            <SettingModal role={userRole} className='justify-start space-x-2.5 pl-2.5' />

                            <Modal
                                mode="confirm"
                                title="Are you sure you want to log out of your account?"
                                onConfirm={handleLogout}
                                variant="ghost"
                                triggerClassName="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors w-full justify-start"
                                triggerLabel={
                                    <>
                                        <i className="bi bi-box-arrow-right text-2xl ml-[3px]" />
                                        <span className="font-medium text-foreground">Logout</span>
                                    </>
                                }
                            />
                        </nav>
                    </div>
                </div>
            )}

            <div className="hidden lg:flex items-center space-x-6">
                {isAdmin && isUserDashboard && (
                    <Link href="/admin/dashboard" className="flex items-center space-x-2 p-1.5 py-1 rounded-md cursor-pointer hover:text-blue-900 dark:hover:bg-foreground/20 transition-colors">
                        <i className="bi bi-person-workspace text-xl w-6 text-center" />
                        <span className="text-sm font-medium">Admin Side</span>
                    </Link>
                )}
                {isAdmin && isAdminPage && (
                    <Link href="/" className="flex items-center space-x-2 p-1.5 py-1 rounded-md cursor-pointer hover:text-blue-900 dark:hover:bg-foreground/20 transition-colors">
                        <i className="bi bi-box-arrow-in-left  w-6 text-center text-2xl" />
                        <span className="text-sm font-medium">Employee Side</span>
                    </Link>
                )}
                <SettingModal role={userRole} />

                <Modal
                    mode="confirm"
                    title="Are you sure you want to log out of your account?"
                    onConfirm={handleLogout}
                    variant="ghost"
                    triggerClassName="hover:text-blue-900 text-gray-700 p-2"
                    triggerLabel={
                        <div className="flex items-center space-x-2">
                            <i className="bi bi-box-arrow-right text-xl text-foreground" />
                            <span className="font-medium text-foreground">Logout</span>
                        </div>
                    }
                />
            </div>
        </header>
    )
}