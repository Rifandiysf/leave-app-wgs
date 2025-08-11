'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Modal from '@/app/components/Modal/Modal';
import Cookies from 'js-cookie';
import SettingModal from '../Modal/Setting'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState({ fullname: 'Guest', isAdmin: false });
    const [isLoading, setIsLoading] = useState(true);

    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (res.ok) {
                    const result = await res.json();
                    const userData = result.user_data;
                    setUser({
                        fullname: userData.fullname,
                        isAdmin: userData.role === 'admin' || userData.role === 'super_admin' 
                    });
                } else {
                    setUser({ fullname: 'Guest', isAdmin: false });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setUser({ fullname: 'Guest', isAdmin: false });
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
                method: 'GET',
                credentials: 'include',
            })

            Cookies.remove('Authorization', { path: '/' });
            Cookies.remove('device-id', { path: '/' });
            router.push('/auth/login');
        } catch (err) {
            console.error('Logout failed', err)
            Cookies.remove('Authorization', { path: '/' });
            Cookies.remove('device-id', { path: '/' });
            router.push('/auth/login');
        }
    }

    const isUserDashboard = pathname === '/' || pathname === '/history' || pathname === '/mandatory';
    const isAdminPage = pathname.startsWith('/admin')

    if (isLoading) {
        return null;
    }

    return (
        <header className="flex items-center justify-between lg:bg-transparent lg:p-0">
            <div className="lg:hidden">
                <Image src="/images/logo-wgs.svg" alt="Logo WGS" width={140} height={38} priority />
                <h2 className="text-xl font-medium text-foreground truncate mt-1">Welcome {user.fullname}</h2>
            </div>

            <div className="flex-1 hidden lg:block"></div>

            <div className="lg:hidden">
                <button onClick={() => setIsMenuOpen(true)} className="p-1.5">
                    <i className="bi bi-list text-2xl text-foreground" />
                </button>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)}>
                    <div className="fixed top-4 right-4 w-60 bg-card rounded-xl shadow-lg z-50 p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-card-foreground">Menu</h3>
                            <button onClick={() => setIsMenuOpen(false)} className="p-1">
                                <i className="bi bi-x text-xl text-card-foreground" />
                            </button>
                        </div>
                        <div className="h-px bg-gray-500 mb-4" />
                        <nav className="flex flex-col">
                            {user.isAdmin && isAdminPage && (
                                <Link href="/" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                                    <i className="bi bi-box-arrow-in-left text-[26px] ml-[2px]" />
                                    <span className="font-medium text-card-foreground">Employee Side</span>
                                </Link>
                            )}
                            {user.isAdmin && isUserDashboard && (
                                <Link href="/admin/dashboard" className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                                    <i className="bi bi-person-workspace text-2xl" />
                                    <span className="font-medium text-card-foreground">Admin Side</span>
                                </Link>
                            )}

                            <SettingModal/>

                            <Modal
                                mode="confirm"
                                title="Are you sure you want to log out of your account?"
                                onConfirm={handleLogout}
                                variant="ghost"
                                triggerClassName="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors w-full justify-start"
                                triggerLabel={
                                    <>
                                        <i className="bi bi-box-arrow-right text-2xl ml-[3px]" />
                                        <span className="font-medium text-card-foreground">Logout</span>
                                    </>
                                }
                            />
                        </nav>
                    </div>
                </div>
            )}

            <div className="hidden lg:flex items-center space-x-6">
                {user.isAdmin && isUserDashboard && (
                    <Link href="/admin/dashboard" className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                        <i className="bi bi-person-workspace text-xl w-6 text-center" />
                        <span className="text-sm font-medium">Admin Side</span>
                    </Link>
                )}
                {user.isAdmin && isAdminPage && (
                    <Link href="/" className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                        <i className="bi bi-box-arrow-in-left  w-6 text-center text-2xl" />
                        <span className="text-sm font-medium">Employee Side</span>
                    </Link>
                )}
                <SettingModal/>
                {/* <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                    <i className="bi bi-gear-fill text-xl" />
                    <span className="text-sm font-medium">Settings</span>
                </div> */}

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