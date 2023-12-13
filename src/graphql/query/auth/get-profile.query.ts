import {AuthQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function getProfileQuery(accessToken: string): Promise<AuthQuery['getUser']> {
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
    headers: {Authorization: `Bearer ${accessToken}`},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data;
}
