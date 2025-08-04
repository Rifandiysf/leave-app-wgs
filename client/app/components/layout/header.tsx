'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Modal from '@/app/components/Modal/Modal';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [fullname, setFullname] = useState('Guest')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false) // State untuk super_admin

    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        try {
            const token = localStorage.getItem('token')
            if (token && token.includes('.')) {
                const payload = JSON.parse(atob(token.split('.')[1]))
                setFullname(payload?.fullname || 'User')

                const role = payload?.role
                // Tentukan role admin dan super_admin
                setIsAdmin(role === 'admin' || role === 'super_admin')
                setIsSuperAdmin(role === 'super_admin') // Akan true HANYA jika rolenya super_admin
            }
        } catch (error) {
            console.error('Failed to parse token:', error)
        }
    }, [])

    const handleLogout = async () => {
        const token = localStorage.getItem('token')
        const deviceId = localStorage.getItem('device-id')
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
                method: 'GET',
                headers: {
                    Authorization: `${token}`,
                    'device-id': deviceId || '',
                },
            })
        } catch (err) {
            console.error('Logout failed', err)
        } finally {
            localStorage.removeItem('token')
            localStorage.removeItem('device-id')
            router.push('/auth/login')
        }
    }

    const isUserDashboard = pathname === '/'
    const isAdminPage = pathname.startsWith('/admin')
    
    return (
        <header className="flex items-center justify-between p-4 bg-white lg:bg-transparent lg:p-0">
            <div className="lg:hidden">
                <Image src="/images/logo-wgs.svg" alt="Logo WGS" width={140} height={38} priority />
                <h2 className="text-xl font-medium text-black truncate mt-1">Welcome {fullname}</h2>
            </div>

            <div className="flex-1 hidden lg:block"></div>

            <div className="lg:hidden">
                <button onClick={() => setIsMenuOpen(true)} className="p-1.5">
                    <i className="bi bi-list text-2xl text-gray-800" />
                </button>
            </div>

            {/* Mobile Menu Pop-out */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)}>
                    <div className="fixed top-4 right-4 w-60 bg-white rounded-xl shadow-lg z-50 p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800">Menu</h3>
                            <button onClick={() => setIsMenuOpen(false)} className="p-1">
                                <i className="bi bi-x text-xl text-gray-600" />
                            </button>
                        </div>
                        <div className="h-px bg-gray-200 mb-2" />
                        <nav className="flex flex-col space-y-1">
                            {isAdmin && isAdminPage && (
                                <Link href="/" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
                                    <i className="bi bi-box-arrow-in-left text-[26px] ml-[2px]" />
                                    <span className="font-medium text-gray-700">Employee Side</span>
                                </Link>
                            )}
                            {isAdmin && isUserDashboard && (
                                <Link href="/admin/dashboard" className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100">
                                    <i className="bi bi-person-workspace text-2xl" />
                                    <span className="font-medium text-gray-700">Admin Side</span>
                                </Link>
                            )}
                            
                            {/* PERBAIKAN DI SINI: Gunakan state 'isSuperAdmin' */}
                            {isSuperAdmin && (
                                <Link href="/admin/settings" className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100">
                                    <i className="bi bi-gear-fill text-2xl" />
                                    <span className="font-medium text-gray-700">Settings</span>
                                </Link>
                            )}
                            
                            <Modal
                                mode="confirm"
                                title="Are you sure you want to log out?"
                                onConfirm={handleLogout}
                                variant="ghost"
                                triggerClassName="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 w-full justify-start"
                                triggerLabel={
                                    <>
                                        <i className="bi bi-box-arrow-right text-2xl ml-[3px]" />
                                        <span className="font-medium text-gray-700">Logout</span>
                                    </>
                                }
                            />
                        </nav>
                    </div>
                </div>
            )}

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center space-x-6">
                {isAdmin && isUserDashboard && (
                    <Link href="/admin/dashboard" className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                        <i className="bi bi-person-workspace text-xl w-6 text-center" />
                        <span className="text-sm font-medium">Admin Side</span>
                    </Link>
                )}
                {isAdmin && isAdminPage && (
                    <Link href="/" className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                        <i className="bi bi-box-arrow-in-left w-6 text-center text-2xl" />
                        <span className="text-sm font-medium">Employee Side</span>
                    </Link>
                )}
                
                {/* PERBAIKAN DI SINI: Gunakan state 'isSuperAdmin' */}
                {isSuperAdmin && (
                    <Link href="/admin/settings" className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                        <i className="bi bi-gear-fill text-xl" />
                        <span className="text-sm font-medium">Settings</span>
                    </Link>
                )}
                
                <Modal
                    mode="confirm"
                    title="Are you sure you want to log out?"
                    onConfirm={handleLogout}
                    variant="ghost"
                    triggerClassName="hover:text-blue-900 text-gray-700 p-0"
                    triggerLabel={
                        <div className="flex items-center space-x-2">
                            <i className="bi bi-box-arrow-right text-xl" />
                            <span className="font-medium">Logout</span>
                        </div>
                    }
                />
            </div>
        </header>
    )
}