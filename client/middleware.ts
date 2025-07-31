import { NextRequest, NextResponse } from "next/server";


export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const protectedRoutes = ['/', '/history', '/mandatory'];

    if (protectedRoutes.includes(pathname)) {
        
        const authToken = request.cookies.get('Authorization')?.value;

        if (!authToken) {
            const url = new URL('/auth/login', request.url);
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
        '/mandatory'
    ],
};