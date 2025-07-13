'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const NotFound = () => {
    const router = useRouter()

    return (
        <div data-notfound className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white">
            <div className="max-w-lg w-full">
                <Image
                    src="/images/notfound.svg"
                    alt="404 astronaut"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    priority
                />
                <button
                    onClick={() => router.back()}
                    className="mt-6 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                    BACK
                </button>
            </div>
        </div>
    )
}

export default NotFound