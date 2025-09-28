// graphql/find-quiz-by-point.ts
import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {gqlFetch} from '@/services/fetch';

type Point = {x: number; y: number};
export async function findQuizByPoint(
  input: {id: string; point: Point},
  token?: string,
  clientIdOverride?: string,
) {
  const clientId = clientIdOverride ?? (getCookie(CookieName.CLIENT_ID) as string);

  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindQuizByPoint($input: FindQuizByPointInput!) {
      graphicalQuiz {
        findQuizByPoint(input: $input) {
          success
          result {
            __typename
            _id
            title
            reward
            duration
            questions {
              _id
              question
              options { answer isCorrect }
            }
            thumbnail { _id filename preview }
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
  return json.data.graphicalQuiz.findQuizByPoint;
}
