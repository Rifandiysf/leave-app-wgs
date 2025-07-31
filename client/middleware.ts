import { NextRequest, NextResponse } from "next/server";


export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const protectedRoutes = ['/', '/history', '/mandatory'];
    const authToken = request.cookies.get('Authorization')?.value; // Mengambil cookie Authorization

    if (protectedRoutes.includes(pathname)) {
        
        console.log("Middleware: Checking protected route:", pathname);
        console.log("Middleware: Authorization cookie value:", authToken); // Tambahkan log ini

        if (!authToken) {
            console.log("Middleware: No Authorization cookie found, redirecting to login."); // Tambahkan log ini
            const url = new URL('/auth/login', request.url);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|logo.png|images|fonts).*)',
        // '/', 
        // '/history', 
        // '/mandatory'
    ],
};