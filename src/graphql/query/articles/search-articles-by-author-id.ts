import {ArticleQuery, SearchArticleInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function searchArticlesByAUthorId(
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
