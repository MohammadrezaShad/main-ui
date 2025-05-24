import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {FindQuizByPointInput, GraphicalQuizQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function findQuizByPoint(
  input: FindQuizByPointInput,
  token?: string,
): Promise<GraphicalQuizQuery['findQuizByPoint']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindQuizByPoint($input: FindQuizByPointInput!) {
      graphicalQuiz {
        findQuizByPoint(input: $input) {
          success
          result {
            _id
            category {
              _id
              description
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
              postCount
              slug
              title
              updatedAt
              createdAt
            }
            createdAt
            duration
            price
            questions {
              _id
              categories {
                _id
                slug
                title
              }
              options {
                answer
                isCorrect
              }
              question
              updatedAt
            }
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
  return response.data.graphicalQuiz.findQuizByPoint;
}
