// graphql/find-graphical-quiz-by-id.ts
import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {FindGraphicalQuizInput, GraphicalQuizQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function findGraphicalQuizById(
  input: FindGraphicalQuizInput,
  token?: string,
  clientIdOverride?: string,
): Promise<GraphicalQuizQuery['findGraphicalQuizById']> {
  // On the client, fall back to browser cookie; on the server, pass clientIdOverride
  const clientId = clientIdOverride ?? (getCookie(CookieName.CLIENT_ID) as string);

  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindGraphicalQuizById($input: FindGraphicalQuizInput!) {
      graphicalQuiz {
        findGraphicalQuizById(input: $input) {
          success
          result {
            __typename
            _id
            title
            duration
            price
            reward
            updatedAt
            thumbnail { _id filename preview }
            image { _id filename preview }
            youEarned
            quizPoints {
              color
              point { x y }
              quiz
              quizObject {
                _id
                title
                reward
                duration
                price
                thumbnail { _id filename preview }
              }
            }
          }
        }
      }
    }`,
    variables: {input},
    headers: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      ...(clientId ? {'client-id': clientId} : {}),
    },
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  const json = await res.json();
  if (json.errors?.[0]?.message) throw new Error(json.errors[0].message);
  return json.data.graphicalQuiz.findGraphicalQuizById;
}
