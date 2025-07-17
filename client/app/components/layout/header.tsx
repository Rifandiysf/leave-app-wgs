'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'

type HeaderProps = {
    role?: "admin" | "user"
}

type UserData = {
    NIK: string
    fullname: string
    role: "admin" | "super_admin" | "user"
}

export default function Header({ role = "user" }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [userData, setUserData] = useState<UserData | null>(null)
    const welcomeMessage = role === "admin" ? "Welcome Admin" : "Welcome User"

    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user')
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser)
                setUserData(parsedUser)
            } catch (error) {
                console.error('Error parsing user data:', error)
            }
        }
    }, [])

    const handleLogout = async () => {
        try {
            const userSession = sessionStorage.getItem('user');
            if (!userSession) {
                console.log("Tidak ada sesi, langsung logout dari frontend.");
                sessionStorage.removeItem('user');
                router.push('/auth/login');
                return;
            }

            const token = JSON.parse(userSession).token;
            const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`;

            await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("Berhasil logout dari server.");
            sessionStorage.removeItem('user');
            router.push('/auth/login');
        } catch (error) {
            console.error("Logout error:", error);
            sessionStorage.removeItem('user');
            router.push('/auth/login');
        }
    }

    const canAccessAdminSite = () => {
        return userData?.role === 'admin' || userData?.role === 'super_admin'
    }

    return (
        <>
            <header className="flex items-center justify-between bg-white lg:bg-transparent lg:p-0">
                <div className="lg:hidden">
                    <Image src="/images/logo-wgs.svg" alt="Logo WGS" width={140} height={38} priority />
                    <h2 className="text-xl font-medium text-black truncate mt-1">{welcomeMessage}</h2>
                </div>

                <div className="flex-1 hidden lg:block"></div>

                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(true)} className="p-1.5">
                        <i className="bi bi-list text-2xl text-gray-800" />
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)}>
                        <div className="fixed top-4 right-4 w-60 bg-white rounded-xl shadow-lg z-50 p-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-800">Menu</h3>
                                <button onClick={() => setIsMenuOpen(false)} className="p-1">
                                    <i className="bi bi-x text-xl text-gray-600" />
                                </button>
                            </div>
                            <div className=" h-px bg-gray-500 mb-4" />
                            <nav className="flex flex-col">
                                {role === "admin" ? (
                                    <Link href={'/'} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                        <i className="bi bi-box-arrow-in-left text-[26px] ml-[2px]" />
                                        <span className="font-medium text-gray-700">Back</span>
                                    </Link>
                                ) : (
                                    canAccessAdminSite() && (
                                        <Link href={'/admin/dashboard'} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                            <i className="bi bi-person-workspace text-2xl" />
                                            <span className="font-medium text-gray-700">Admin site</span>
                                        </Link>
                                    )
                                )}
                                <Link href="#" className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                    <i className="bi bi-gear text-2xl" />
                                    <span className="font-medium text-gray-700">Setting</span>
                                </Link>

                                <button onClick={handleLogout} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                    <i className="bi bi-box-arrow-right text-2xl ml-[3px]" />
                                    <span className="font-medium text-gray-700">Logout</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                )}

                <div className="hidden lg:flex items-center space-x-6">
                    {role === "admin" ? (
                        <>
                            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                                <i className="bi bi-gear-fill text-xl" />
                                <span className="text-sm font-medium">Settings</span>
                            </div>

                            <div onClick={handleLogout} className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                                <i className="bi bi-box-arrow-right text-xl" />
                                <span className="text-sm font-medium">Logout</span>
                            </div>
                        </>
                    ) : (
                        <>
                            {canAccessAdminSite() && (
                                <Link href={'/admin/dashboard'} className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                                    <i className="bi bi-person-workspace text-xl w-6 text-center" />
                                    <span className="text-sm font-medium">Admin site</span>
                                </Link>
                            )}

                            <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                                <i className="bi bi-gear-fill text-xl" />
                                <span className="text-sm font-medium">Settings</span>
                            </div>

                            <div onClick={handleLogout} className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                                <i className="bi bi-box-arrow-right text-xl" />
                                <span className="text-sm font-medium">Logout</span>
                            </div>
                        </>
                    )}
                </div>
            </header>
        </>
    )
}