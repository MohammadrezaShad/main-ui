import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {QuizQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function getTopQuizzes(): Promise<QuizQuery['getTopQuizzes']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query GetTopQuizzes {
      quiz {
        getTopQuizzes {
          success
          result {
            _id
            createdAt
            duration
            price
            questions {
              _id
              categories {
                _id
                title
                slug
              }
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
    variables: {},
    headers: {'client-id': clientId},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.quiz.getTopQuizzes;
}
