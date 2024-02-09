import {setCookie} from 'cookies-next';
import {NextRequest, NextResponse} from 'next/server';

import {CookieName} from '@/constants';

export const setTokens = ({
  accessToken,
  refreshToken,
  req,
  res,
}: {
  accessToken: string;
  refreshToken: string;
  req?: NextRequest;
  res?: NextResponse;
}) => {
  const expirationTime = 14 * 24 * 60 * 60 * 1000;
  const expirationDate = new Date(Date.now() + expirationTime);

  setCookie(CookieName.ACCESS_TOKEN, accessToken, {expires: expirationDate, res, req});
  setCookie(CookieName.REFRESH_TOKEN, refreshToken, {expires: expirationDate, res, req});
};
