'use client'

import { useRouter } from "next/navigation"

export default function ForbiddenPage() {
    const router = useRouter()
    return (
        <main>
            <div className="flex justify-center items-center flex-col gap-3 min-h-screen">
                <h1 className="text-2xl font-bold">403 - Forbidden</h1>
                <p>You don't have permission to access this page.</p>
                <p className="text-lg font-medium">Access Denied</p>
                <button 
                    onClick={() => router.back()}
                    className="mt-6 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                    BACK
                </button>
            </div>
        </main>
    )
}