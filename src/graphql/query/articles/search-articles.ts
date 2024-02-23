import {gqlFetch} from '@/services/fetch';

import {CookieName} from '@/constants';
import {getCookie} from 'cookies-next';
import {ArticleType, SearchArticleInput} from '../../generated/types';

export async function searchArticles(input: SearchArticleInput): Promise<ArticleType> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchArticles($input: SearchArticleInput!) {
      article {
        searchArticles(input: $input) {
          totalPages
          totalCount
          success
          results {
            _id
            publishDate
            updatedAt
            slug
            status
            title
            excerpt
            thumbnail {
              _id
              alt
              filename
              height
              preview
              width
            }
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
  // if (response.errors?.[0]?.message) {
  //   throw new Error(response.errors?.[0]?.message);
  // }
  return response.data;
}
