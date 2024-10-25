import {AuthMutation, Scalars, UpdateUserInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function updateUser(
  input: UpdateUserInput,
  token: string,
  avatar?: Scalars['Upload']['input'],
): Promise<AuthMutation['updateUser']> {
  const formData = new FormData();
  const query = `mutation UpdateUser($input: UpdateUserInput!, $avatar: Upload) {
      auth {
        updateUser(input: $input, avatar: $avatar) {
          success
          token
        }
      }
    }`;

  formData.append(
    'operations',
    JSON.stringify({
      query,
      variables: {
        input: {...input},
        avatar: null,
      },
    }),
  );
  formData.append('map', JSON.stringify({avatar: ['variables.avatar']}));

  if (avatar) {
    formData.append('avatar', avatar);
  }
  const res = avatar
    ? await fetch(process.env.NEXT_PUBLIC_API as string, {
        method: 'POST',
        headers: {
          'apollo-require-preflight': 'true',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
    : await gqlFetch({
        url: process.env.NEXT_PUBLIC_API as string,
        query,
        variables: {input},
        headers: {Authorization: `Bearer ${token}`},
      });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.auth.updateUser;
}
