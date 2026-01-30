import { NextRequest, NextResponse } from 'next/server';

const PRIVATE_ROUTES = ['/profile', '/notes'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession = request.cookies.get('connect.sid');

  if (
    !hasSession &&
    PRIVATE_ROUTES.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (
    hasSession &&
    AUTH_ROUTES.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
