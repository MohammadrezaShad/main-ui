import {gqlFetch} from '@/services/fetch';
import {ArticleQuery, SearchArticleInput} from '../generated/types';

export async function searchArticleByCategory(
  input: SearchArticleInput,
): Promise<ArticleQuery['searchArticles']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchArticles($input: SearchArticleInput!) {
        article {
          searchArticles(input: $input) {
            results {
              _id
              excerpt
              publishDate
              slug
              tags {
                _id
                image {
                  _id
                  alt
                  filename
                  height
                  preview
                  width
                }
                title
                slug
              }
              thumbnail {
                _id
                alt
                filename
                height
                preview
                width
              }
              title
              status
            }
            success
            totalCount
            totalPages
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
