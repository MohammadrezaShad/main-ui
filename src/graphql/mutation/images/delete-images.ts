import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {DeleteImagesInput, ImageMutation} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function deleteImages(
  input: DeleteImagesInput,
): Promise<ImageMutation['deleteImages']> {
  const token = getCookie(CookieName.ACCESS_TOKEN);
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `mutation DeleteImages($input: DeleteImagesInput!) {
      image {
        deleteImages(input: $input) {
          success
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
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data;
}
