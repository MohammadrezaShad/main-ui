import {gqlFetch} from '@/services/fetch';
import {ArticleQuery, FindRelatedArticlesInput} from '../generated/types';

export async function findRelatedArticles(
  input: FindRelatedArticlesInput,
): Promise<ArticleQuery['findRelatedArticles']> {
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
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data;
}
