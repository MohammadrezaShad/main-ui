import {BookmarkMutation} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function addBookmark(
  input: {article: string},
  accessToken: string,
): Promise<BookmarkMutation['createBookmark']> {
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
    headers: {Authorization: `Bearer ${accessToken}`},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data;
}
