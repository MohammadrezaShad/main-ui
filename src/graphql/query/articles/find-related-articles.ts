import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {gqlFetch} from '@/services/fetch';

import {ArticleQuery, FindRelatedArticlesInput} from '../../generated/types';

export async function findRelatedArticles(
  input: FindRelatedArticlesInput,
): Promise<ArticleQuery['findRelatedArticles']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query Results($input: FindRelatedArticlesInput!) {
        article {
          findRelatedArticles(input: $input) {
            results {
              _id
              excerpt
              publishDate
              slug
              thumbnail {
                _id
                alt
                filename
                height
                preview
                width
              }
              title
            }
            success
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
  return response.data;
}
