'use client'

import { usePathname } from "next/navigation"

type HeaderProps = {
    onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
    const pathname = usePathname()

    return (
        <header className="flex items-center justify-between mb-8 sm:mb-4">
            <button
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <i className="bi bi-list text-2xl text-gray-600" />
            </button>

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
                {pathname === '/special' && (
                    <div className="hidden sm:block">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-4 py-2 border rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-48"
                        />
                    </div>
                )}
                <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                    <i className="bi bi-gear-fill text-xl" />
                    <span className="text-sm font-medium">Settings</span>
                </div>

                <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-900 transition-colors">
                    <i className="bi bi-box-arrow-right text-xl" />
                    <span className="text-sm font-medium">Logout</span>
                </div>
            </div>
        </header>
    )
}
