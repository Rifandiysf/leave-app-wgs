'use client'

export default function Header() {

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
