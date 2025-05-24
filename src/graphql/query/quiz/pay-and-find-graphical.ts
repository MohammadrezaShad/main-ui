import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {FindGraphicalQuizInput, GraphicalQuizQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function payAndFindGraphical(
  input: FindGraphicalQuizInput,
  token?: string,
): Promise<GraphicalQuizQuery['payAndFind']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query PayAndFind($input: FindGraphicalQuizInput!) {
      graphicalQuiz {
        payAndFind(input: $input) {
          success
          result {
            _id
            category {
              _id
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
              slug
              title
            }
            createdAt
            duration
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
            price
            reward
            thumbnail {
              _id
              alt
              createdAt
              filename
              height
              preview
              updatedAt
              width
            }
            title
            updatedAt
            youEarned
          }
        }
      }
    }`,
    variables: {input},
    headers: {
      Authorization: `Bearer ${token}`,
      'client-id': clientId,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.graphicalQuiz.payAndFind;
}
