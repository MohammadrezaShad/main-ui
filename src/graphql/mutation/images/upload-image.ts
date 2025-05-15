import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {ImageMutation, Scalars, UploadImageInputType} from '@/graphql/generated/types';

export async function uploadImage(
  file: Scalars['Upload']['input'],
  input: UploadImageInputType,
): Promise<ImageMutation['uploadImage']> {
  const token = getCookie(CookieName.ACCESS_TOKEN);
  const formData = new FormData();
  const query = `mutation UploadImage($file: Upload!, $input: UploadImageInputType) {
    image {
      uploadImage(file: $file, input: $input) {
        success
        image {
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
  }`;

  formData.append(
    'operations',
    JSON.stringify({
      query,
      variables: {
        input: {...input},
        file: null,
      },
    }),
  );
  formData.append('map', JSON.stringify({file: ['variables.file']}));

  if (file) {
    formData.append('file', file);
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API as string, {
    method: 'POST',
    headers: {
      'apollo-require-preflight': 'true',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to add video');
  }

  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.image.uploadImage;
}
