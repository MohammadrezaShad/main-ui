import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {BestUserInput, UserQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function getBestUsers(input: BestUserInput): Promise<UserQuery['getBestUsers']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query GetBestUsers($input: BestUserInput!) {
        users {
          getBestUsers(input: $input) {
            totalPages
            totalCount
            success
            results {
              _id
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
              coins
              createdAt
              displayName
              email
              firstName
              gender
              googleId
              hometown
              isCreatedWithSocialMedia
              isVerified
              lastName
              nickname
              password
              phone
              role
              updatedAt
              username
              website
            }
          }
        }
      }`,
    variables: {input},
    headers: {'client-id': clientId},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  // if (response.errors?.[0]?.message) {
  //   throw new Error(response.errors?.[0]?.message);
  // }
  return response.data.users.getBestUsers;
}
