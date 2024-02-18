import {gqlFetch} from '@/services/fetch';

import {CookieName} from '@/constants';
import {getCookie} from 'cookies-next';
import {AuthQuery, SigninInput} from '../../generated/types';

export async function signin(input: SigninInput): Promise<AuthQuery['signin']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query Signin($input: SigninInput!) {
        auth {
          signin(input: $input) {
            token
            success
          }
        }
      }`,
    variables: {input},
    headers: {'client-id': clientId},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data;
}
