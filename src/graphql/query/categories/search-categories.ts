import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {gqlFetch} from '@/services/fetch';

import {CategoryQuery, SearchCategoryInput} from '../../generated/types';

export async function searchCategories(
  input: SearchCategoryInput,
): Promise<CategoryQuery['searchCategories']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchCategories($input: SearchCategoryInput!) {
          category {
            searchCategories(input: $input) {
              results {
                title
                slug
                _id
                image {
                  _id
                  filename
                  width
                  height
                  alt
                }
                postCount
                withPdfArticlesPostCount
                withoutPdfArticlesPostCount
              }
              success
              totalCount
              totalPages
            }
          }
        }`,
    variables: {input},
    headers: {
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
  return response.data;
}
