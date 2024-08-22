import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {gqlFetch} from '@/services/fetch';

import {type ArticleQuery, type ShareArticleInput} from '../../generated/types';

export async function shareToSocialNetworks(
  input: ShareArticleInput,
): Promise<ArticleQuery['searchArticles']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query ShareToSocialNetworks($input: ShareArticleInput!) {
  article {
    shareToSocialNetworks(input: $input) {
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
  return response.data.article.ShareToSocialNetworks;
}
