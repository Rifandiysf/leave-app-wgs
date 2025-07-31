import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const body = await req.json()
    const { email, password } = body

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    })

    const result = await response.json()

    if (!response.ok) {
        return NextResponse.json({ message: result.message }, { status: 401 })
    }

    const res = NextResponse.json({ success: true })

    res.cookies.set('Authorization', result.token, {
        httpOnly: true,
        path: '/',
        maxAge: 3600,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'lax',
    })

    res.cookies.set('device-id', result.device_id, {
        httpOnly: true,
        path: '/',
        maxAge: 3600,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'lax',
    })

    return res
}
