'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import Modal from "../Modal/Modal"

type HeaderProps = {
    role?: "admin" | "user"
}

export default function Header({ role = "user" }: HeaderProps) {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
                method: 'GET',
                // credentials: "include"
            })

            console.log(res.json())
            sessionStorage.removeItem('user')

            router.push('/auth/login')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <header className="flex items-center justify-between mb-8 sm:mb-4">
            <div className="flex-1"></div>
            <div className="sm:hidden flex items-center space-x-2">
                <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                    <i className="bi bi-gear-fill text-lg text-gray-600 hover:text-blue-900" />
                </button>
                <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                    <i className="bi bi-box-arrow-right text-lg text-gray-600 hover:text-blue-900" />
                </button>
            </div>

            <div className="hidden sm:flex items-center space-x-6">
                {role === "admin" ? (
                    <>
                        <Link href={'/admin/dashboard'} className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                            <i className="bi bi-person-workspace text-xl w-6 text-center" />
                            <span className="text-sm font-medium">Admin sitee</span>
                        </Link>

                        <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                            <i className="bi bi-gear-fill text-xl" />
                            <span className="text-sm font-medium">Settings</span>
                        </div>

                        <Modal
                            mode="confirm"
                            size="default"
                            variant="ghost"
                            triggerLabel={
                                <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                                    <i className="bi bi-box-arrow-right text-xl" />
                                    <span className="text-sm font-medium">Logout</span>
                                </div>
                            }
                            title="Are you sure you want to log out of your account?"
                            description=""
                        />
                    </>
                ) : (
                    <>
                        <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                            <i className="bi bi-gear-fill text-xl" />
                            <span className="text-sm font-medium">Settings</span>
                        </div>

                        <Modal
                            mode="confirm"
                            size="default"
                            variant="ghost"
                            triggerLabel={
                                <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                                    <i className="bi bi-box-arrow-right text-xl" />
                                    <span className="text-sm font-medium">Logout</span>
                                </div>
                            }
                            title="Are you sure you want to log out of your account?"
                            description=""
                            onClick={handleLogout}
                        />
                    </>
                )}
            </div>
        </header>
    )
}
