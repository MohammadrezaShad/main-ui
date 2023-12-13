import {FindUserInput, UserQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function findUserById(
  input: FindUserInput,
  token: string,
): Promise<UserQuery['findUserById']> {
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
    headers: {Authorization: `Bearer ${token}`},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data;
}
