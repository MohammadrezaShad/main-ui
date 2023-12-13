import {setCookie} from 'cookies-next';

import {CookieName} from '@/constants';

export const setTokens = ({
  authToken,
  refreshToken,
  req,
  res,
}: {
  authToken: string;
  refreshToken?: string;
  req?: any;
  res?: any;
}) => {
  const expirationTime = 14 * 24 * 60 * 60 * 1000;
  const expirationDate = new Date(Date.now() + expirationTime);

  setCookie(CookieName.AUTH_TOKEN, authToken, {expires: expirationDate, res, req});
};
