import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log('Path: ' + pathname)
    if (
        pathname.startsWith('/api/auth') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('public') ||
        pathname === '/login' ||
        pathname === '/users/register' ||
        pathname === '/'
    ) {
        return NextResponse.next()
    }

    const accessToken = request.cookies.get('access_token')?.value;
    if (!accessToken || accessToken.trim().length <= 0) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};