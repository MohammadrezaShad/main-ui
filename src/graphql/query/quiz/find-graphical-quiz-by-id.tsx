import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {FindGraphicalQuizInput, GraphicalQuizQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function findGraphicalQuizById(
  input: FindGraphicalQuizInput,
  token?: string,
): Promise<GraphicalQuizQuery['findGraphicalQuizById']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindGraphicalQuizById($input: FindGraphicalQuizInput!) {
      graphicalQuiz {
        findGraphicalQuizById(input: $input) {
          success
          result {
            __typename
            _id
            category {
              _id
              createdAt
              description
              hasSeoApproval
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
              isDescriptionApproved
              originalDescription
              parent {
                _id
                slug
                title
              }
              postCount
              slug
              title
              updatedAt
            }
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
            quizPoints {
              point {
                x
                y
              }
              quiz
              quizObject {
                _id
                duration
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
                youEarned
              }
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
  return response.data.graphicalQuiz.findGraphicalQuizById;
}
