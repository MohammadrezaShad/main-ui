import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {FindQuizInput, QuizQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function payAndFindNormal(
  input: FindQuizInput,
  token?: string,
): Promise<QuizQuery['payAndFind']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query PayAndFind($input: FindQuizInput!) {
        quiz {
          payAndFind(input: $input) {
            success
            result {
              _id
              createdAt
              duration
              price
              questions {
                _id
                createdAt
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
            }
          }
        }
      }`,
    variables: {input},
    headers: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
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
  return response.data.quiz.payAndFind;
}
