import {deleteCookie} from 'cookies-next';

import {CookieName} from '@/constants';

export const deleteTokens = ({req, res}: {req?: any; res?: any}) => {
  deleteCookie(CookieName.AUTH_TOKEN, {req, res});
};
