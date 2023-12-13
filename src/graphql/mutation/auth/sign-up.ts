import {AuthMutation, SignupInputType} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function signUp(input: SignupInputType): Promise<AuthMutation['signup']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `mutation Signup($input: SignupInputType!) {
        auth {
          signup(input: $input) {
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
