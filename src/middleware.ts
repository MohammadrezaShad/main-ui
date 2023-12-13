import {getCookie} from 'cookies-next';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

import {CookieName} from '@/constants/coooki-name.enum';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const accessToken = getCookie(CookieName.AUTH_TOKEN, {res, req});
  const originalPath = req.headers.get('x-original-url') || new URL(req.url).pathname;
  const profilePath = '/profile';
  const authorPath = '/author';
  const homePath = '/';

  if (!accessToken && originalPath === profilePath) {
    return NextResponse.redirect(new URL(homePath, req.url));
  }

  if (!accessToken && originalPath.includes(authorPath)) {
    return NextResponse.redirect(new URL(homePath, req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
