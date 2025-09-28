import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {GraphicalQuizQuery, SearchGraphicalQuizInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function searchGraphicalQuizzes(
  input: SearchGraphicalQuizInput,
  token: string,
): Promise<GraphicalQuizQuery['searchGraphicalQuizzes']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchGraphicalQuizzes($input: SearchGraphicalQuizInput!) {
      graphicalQuiz {
        searchGraphicalQuizzes(input: $input) {
          totalPages
          totalCount
          success
          results {
            _id
            __typename
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
    headers: {Authorization: `Bearer ${token}`, 'client-id': clientId},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.graphicalQuiz.searchGraphicalQuizzes;
}
