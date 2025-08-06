import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const authToken = request.cookies.get('Authorization')?.value;
    const protectedRoutes = ['/', '/history', '/mandatory'];
    const loginPath = '/auth/login';
    const adminPaths = '/admin';

    if (pathname === loginPath && authToken) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (protectedRoutes.includes(pathname) || pathname.startsWith(adminPaths)) {
        if (!authToken) {
            const url = new URL(loginPath, request.url);
            url.searchParams.set('from', pathname);
            return NextResponse.redirect(url);
        }

        try {
            const { payload } = await jwtVerify(authToken, secret);
            const userRole = payload.role as string;

            if (pathname.startsWith(adminPaths) && !['admin', 'super_admin'].includes(userRole)) {
                return NextResponse.redirect(new URL('/forbidden', request.url));
            }
            
        } catch (error) {
            console.error("Token verification failed:", error);
            const url = new URL(loginPath, request.url);
            url.searchParams.set('expired', 'true');
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|logo.png|images|fonts).*)',
        '/', 
        '/history', 
        '/mandatory',
        '/admin/:path*',
        '/auth/login'
    ],
};