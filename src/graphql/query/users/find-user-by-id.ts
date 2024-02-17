import {CookieName} from '@/constants';
import {FindUserInput, UserQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';
import {getCookie} from 'cookies-next';

export async function findUserById(
  input: FindUserInput,
  token: string,
): Promise<UserQuery['findUserById']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindUserById($input: FindUserInput!) {
        users {
          findUserById(input: $input) {
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
            createdAt
            displayName
            email
            role
            username
          }
        }
      }`,
    variables: {input},
    headers: {Authorization: `Bearer ${token}`, 'client-id': clientId},
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
