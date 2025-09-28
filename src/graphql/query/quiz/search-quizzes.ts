import {QuizQuery, SearchQuizInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function searchQuizzes(input: SearchQuizInput): Promise<QuizQuery['searchQuizzes']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchQuizzes($input: SearchQuizInput!) {
        quiz {
          searchQuizzes(input: $input) {
            success
            totalCount
            totalPages
            results {
               __typename
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
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.quiz.searchQuizzes;
}
