import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {gqlFetch} from '@/services/fetch';

import {FindRedirectByOldPathInput, RedirectResponse} from '../../generated/types';

export async function findRedirectByPath(
  input: FindRedirectByOldPathInput,
): Promise<RedirectResponse['findRedirectByOldPath']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  console.log(input);

  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindRedirectByOldPath($input: FindRedirectByOldPathInput!) {
  redirects {
    findRedirectByOldPath(input: $input) {
      success
      result {
        newPath
        oldPath
        type
      }
    }
  }
}`,
    variables: {input},
    headers: {
      'client-id': clientId,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data?.redirects?.findRedirectByOldPath;
}
