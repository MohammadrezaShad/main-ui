import {gqlFetch} from '@/services/fetch';

import {ArticleType, SearchArticleInput} from '../generated/types';

export async function searchArticles(input: SearchArticleInput): Promise<ArticleType> {
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
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data;
}
