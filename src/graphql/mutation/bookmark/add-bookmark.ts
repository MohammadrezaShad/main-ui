import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {BookmarkMutation} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function addBookmark(
  input: {article: string},
  accessToken: string,
): Promise<BookmarkMutation['createBookmark']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `mutation CreateBookmark($input: CreateBookmarkInput!) {
      bookmark {
        createBookmark(input: $input) {
          success
        }
      }
    }`,
    variables: {input},
    headers: {Authorization: `Bearer ${accessToken}`, 'client-id': clientId},
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
