import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'rpg42-session';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  const isTryingToAccessApp = request.nextUrl.pathname.startsWith('/game');
  const isTryingToAccessAuth = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup');

  // If there's no session cookie and they're trying to access the game, redirect to login
  if (!sessionCookie && isTryingToAccessApp) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If there IS a session cookie and they're trying to access an auth page, redirect to game
  if (sessionCookie && isTryingToAccessAuth) {
    return NextResponse.redirect(new URL('/game', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/game/:path*', '/login', '/signup'],
};
