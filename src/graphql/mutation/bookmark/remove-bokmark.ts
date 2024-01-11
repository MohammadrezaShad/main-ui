import {BookmarkMutation, DeleteOneArticleBookmarkInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function deleteBookmark(
  input: DeleteOneArticleBookmarkInput,
  accessToken: string,
): Promise<BookmarkMutation['deleteOneBookmark']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `mutation DeleteOneBookmark($input: DeleteOneArticleBookmarkInput!) {
      bookmark {
        deleteOneBookmark(input: $input) {
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
