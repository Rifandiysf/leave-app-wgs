'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Modal from '@/app/components/Modal/Modal';
import Cookies from 'js-cookie';
import SettingModal from '../Modal/Setting'
import { useSetting } from '@/lib/context/SettingContext'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState({ fullname: 'Guest', isAdmin: false, role: '' });
    const [isLoading, setIsLoading] = useState(true);

    const pathname = usePathname()
    const router = useRouter()
    const { images } = useSetting()
    const [logoSrc, setLogoSrc] = useState("/images/logo-wgs.svg");
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (!images) return;

        const updateLogo = () => {
            const currentTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
            let darkMode = false;

            if (currentTheme === "dark") darkMode = true;
            else if (currentTheme === "light") darkMode = false;
            else darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

            setIsDarkMode(darkMode);
            setLogoSrc(darkMode ? images.dark_image ?? "/images/logo-wgs.svg" : images.light_image ?? "/images/logo-wgs.svg");
        };

        // update langsung saat mount
        updateLogo();

        // listener system theme change
        const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");
        const listener = (e: MediaQueryListEvent) => {
            const currentTheme = localStorage.getItem("theme");
            if (!currentTheme || currentTheme === "system") {
                updateLogo();
            }
        };
        darkMedia.addEventListener("change", listener);

        // listener localStorage theme change (jika theme diubah di tempat lain)
        const storageListener = (e: StorageEvent) => {
            if (e.key === "theme") updateLogo();
        };
        window.addEventListener("storage", storageListener);

        return () => {
            darkMedia.removeEventListener("change", listener);
            window.removeEventListener("storage", storageListener);
        };
    }, [images]);


    const getLogoSrc = () => {
        if (!images) return "/images/logo-wgs.svg";
        return isDarkMode ? (images.dark_image ?? "/images/logo-wgs.svg") : (images.light_image ?? "/images/logo-wgs.svg");
    };

    useEffect(() => {
        setLogoSrc(getLogoSrc());
    }, [images, isDarkMode]);

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
                        isAdmin: userData.role === 'admin' || userData.role === 'super_admin',
                        role: userData.role
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

    const isUserDashboard = pathname === '/' || pathname === '/history' || pathname === '/mandatory' || pathname === '/adjust-history' ||pathname === '/information';
    const isAdminPage = pathname.startsWith('/admin')

    if (isLoading) {
        return null;
    }

    return (
        <header className="flex items-center justify-between lg:bg-transparent lg:p-0">
            <div className="lg:hidden">
                <Image src={logoSrc} alt="Logo WGS" width={90} height={90} priority />
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
                    <div className="fixed top-4 right-4 w-60 dark:bg-card bg-background rounded-xl shadow-lg z-50 p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-foreground">Menu</h3>
                            <button onClick={() => setIsMenuOpen(false)} className="p-1">
                                <i className="bi bi-x text-xl text-foreground" />
                            </button>
                        </div>
                        <div className="h-px bg-gray-500 mb-4" />
                        <nav className="flex flex-col">
                            {user.isAdmin && isAdminPage && (
                                <Link href="/" className="flex items-center space-x-3 p-2 rounded-lg dark:hover:bg-foreground/20 transition-colors">
                                    <i className="bi bi-box-arrow-in-left text-[24px] ml-[2px]" />
                                    <span className="font-medium text-foreground">Employee Side</span>
                                </Link>
                            )}
                            {user.isAdmin && isUserDashboard && (
                                <Link href="/admin/dashboard" className="flex items-center space-x-4 p-2 rounded-lg dark:hover:bg-foreground/20 transition-colors">
                                    <i className="bi bi-person-workspace text-xl" />
                                    <span className="font-medium text-foreground">Admin Side</span>
                                </Link>
                            )}

                            <SettingModal role={user.role} className='justify-start space-x-2.5 pl-2.5'/>

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
                {user.isAdmin && isUserDashboard && (
                    <Link href="/admin/dashboard" className="flex items-center space-x-2 p-1.5 py-1 rounded-md cursor-pointer hover:text-blue-900 dark:hover:bg-foreground/20 transition-colors">
                        <i className="bi bi-person-workspace text-xl w-6 text-center" />
                        <span className="text-sm font-medium">Admin Side</span>
                    </Link>
                )}
                {user.isAdmin && isAdminPage && (
                    <Link href="/" className="flex items-center space-x-2 p-1.5 py-1 rounded-md cursor-pointer hover:text-blue-900 dark:hover:bg-foreground/20 transition-colors">
                        <i className="bi bi-box-arrow-in-left  w-6 text-center text-2xl" />
                        <span className="text-sm font-medium">Employee Side</span>
                    </Link>
                )}
                <SettingModal role={user.role}/>

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