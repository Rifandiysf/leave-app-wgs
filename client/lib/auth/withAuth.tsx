'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ComponentType, JSX } from 'react'

type Options = {
    requireAdmin?: boolean
}

export default function withAuth<P extends JSX.IntrinsicAttributes>(
    WrappedComponent: ComponentType<P>,
    options?: Options
) {
    return function ProtectedPage(props: P) {
        const router = useRouter()

        useEffect(() => {
            const token = localStorage.getItem('token')
            const deviceId = localStorage.getItem('device-id')

            if (!token || !deviceId) {
                router.replace('/auth/login')
                return
            }

            try {
                const payload = JSON.parse(atob(token.split('.')[1])) // decode JWT
                const role = payload?.role

                if (options?.requireAdmin && role !== 'admin') {
                    router.replace('/unauthorized')
                }
            } catch (err) {
                console.error('Invalid token:', err)
                localStorage.clear()
                router.replace('/auth/login')
            }
        }, [])

        return <WrappedComponent {...props} />
    }
}
