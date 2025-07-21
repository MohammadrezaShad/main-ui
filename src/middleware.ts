import {getCookie, setCookie} from 'cookies-next';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {v4 as uuidv4} from 'uuid';

import {CookieName} from '@/constants/coooki-name.enum';
import {findRedirectByPath} from '@/graphql/query/redirect/find-redirect-by-path';

enum RedirectStatusEnum {
  PERMANENT_TRANSFER = 301,
  DETECTED = 302,
  SEE_OTHER = 303,
  TEMPORARY_VEER = 307,
  PERMANENT_REDIRECT = 308,
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const accessToken = getCookie(CookieName.AUTH_TOKEN, {res, req});
  const clientId = getCookie(CookieName.CLIENT_ID, {res, req});
  const originalPath = req.headers.get('x-original-url') || new URL(req.url).pathname;
  const profilePath = '/profile';
  const homePath = '/';

  const redirectData = await findRedirectByPath({oldPath: decodeURIComponent(originalPath)});

  if (redirectData?.result?.newPath) {
    return NextResponse.redirect(
      new URL(redirectData.result.newPath, req.url),
      RedirectStatusEnum[redirectData.result.type as keyof typeof RedirectStatusEnum] ||
        RedirectStatusEnum.PERMANENT_TRANSFER,
    );
  }

  if (!clientId) {
    setCookie(CookieName.CLIENT_ID, uuidv4(), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      res,
      req,
    });
  }

  if (!accessToken && originalPath === profilePath) {
    return NextResponse.redirect(new URL(homePath, req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
