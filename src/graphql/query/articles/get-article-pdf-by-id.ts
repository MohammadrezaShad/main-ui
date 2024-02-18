import {CookieName} from '@/constants';
import {gqlFetch} from '@/services/fetch';
import {getCookie} from 'cookies-next';
import {ArticleQuery, DownloadArticleInput} from '../..';

export async function getArticlePdfById(
  input: DownloadArticleInput,
): Promise<ArticleQuery['getArticlePdfById']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query Article($input: DownloadArticleInput!) {
      article {
        getArticlePdfById(input: $input)
      }
    }`,
    variables: {input},
    headers: {'client-id': clientId},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.article.getArticlePdfById;
}
