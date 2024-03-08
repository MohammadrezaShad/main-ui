import {CookieName} from '@/constants';
import {EndQuizInput, QuizMutation} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';
import {getCookie} from 'cookies-next';

export async function endQuiz(
  input: EndQuizInput,
  accessToken: string,
): Promise<QuizMutation['endQuiz']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `mutation EndQuiz($input: EndQuizInput!) {
      quiz {
        endQuiz(input: $input) {
          success
        }
      }
    }`,
    variables: {input},
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
  return response.data.quiz.endQuiz;
}
