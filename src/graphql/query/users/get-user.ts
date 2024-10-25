import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {AuthQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function getUser(accessToken: string): Promise<AuthQuery['getUser'] | null> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query GetUser {
      auth {
        getUser {
          _id
          coins
          articlesWrittenCount
          articlesWrittenSavedCount
          articlesWrittenVisitedCount
          avatar {
            _id
            alt
            createdAt
            filename
            height
            preview
            updatedAt
            width
          }
          avatarStatus
          commentsCount
          createdAt
          displayName
          downloadedArticlesCount
          email
          firstName
          gender
          hometown
          isCreatedWithSocialMedia
          isVerified
          lastName
          nickname
          phone
          role
          savedArticlesCount
          timeSpent
          updatedAt
          username
          visitedArticlesCount
          website
          facebook
          instagram
          twitter
          linkedin
          telegram
          whatsApp
        }
      }
    }`,
    variables: {},
    headers: {Authorization: `Bearer ${accessToken}`, 'client-id': clientId},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    return null;
  }
  return response.data.auth.getUser;
}
