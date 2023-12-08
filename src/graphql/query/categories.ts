import {gqlFetch} from '@/services/fetch';
import {CategoryQuery, SearchCategoryInput} from '../generated/types';

export async function searchCategories(
  input: SearchCategoryInput,
): Promise<CategoryQuery['searchCategories']> {
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
              }
              success
              totalCount
              totalPages
            }
          }
        }`,
    variables: {input},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data;
}
