import { NextRequest, NextResponse } from "next/server";


export default function middleware(request: NextRequest) {
    // const session = sessionStorage.getItem('user')
    // const { pathname } = request.nextUrl

    // console.log(session)
    // const isLoginPage = pathname === '/auth/login'
    // const isPublicPath = isLoginPage

    // if (!session && isPublicPath) {
    //     return NextResponse.redirect(new URL('/auth/login', request.url))
    // }

    // if (session && isPublicPath) {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }

    // if (pathname.startsWith('/admin') && session !== 'admin') {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|logo.png|images|fonts).*)',
    ],
};