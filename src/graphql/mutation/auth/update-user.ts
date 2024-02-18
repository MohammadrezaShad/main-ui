import {CookieName} from '@/constants';
import {AuthMutation, UpdateUserInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';
import {getCookie} from 'cookies-next';

export async function updateUser(
  input: UpdateUserInput,
  accessToken: string,
): Promise<AuthMutation['updateUser']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `mutation UpdateUser($input: UpdateUserInput!) {
      auth {
        updateUser(input: $input) {
          success
          token
        }
      }
    }`,
    variables: {input},
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
