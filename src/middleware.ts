import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

import {HeaderName} from '@/constants';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set(HeaderName.PATHNAME, request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
