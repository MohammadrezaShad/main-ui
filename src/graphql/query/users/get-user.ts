import {CookieName} from '@/constants';
import {AuthQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';
import {getCookie} from 'cookies-next';

export async function getUser(accessToken: string): Promise<AuthQuery['getUser']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query GetUser {
        auth {
          getUser {
            _id
            avatarStatus
            createdAt
            displayName
            email
            isCreatedWithSocialMedia
            isVerified
            phone
            role
            updatedAt
            username
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
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data;
}
