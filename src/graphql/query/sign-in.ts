import {gqlFetch} from '@/services/fetch';

import {AuthQuery, SigninInput} from '../generated/types';

export async function signin(input: SigninInput): Promise<AuthQuery['signin']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query Signin($input: SigninInput!) {
        auth {
          signin(input: $input) {
            token
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
