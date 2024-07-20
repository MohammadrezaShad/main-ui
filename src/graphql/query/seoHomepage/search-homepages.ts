import {type SearchSeoHomepageInput, type SeoHomepageQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function searchHomepages(
  input: SearchSeoHomepageInput,
): Promise<SeoHomepageQuery['searchHomepages']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchHomepages($input: SearchSeoHomepageInput!) {
        seoHomepage {
          searchHomepages(input: $input) {
            totalPages
            totalCount
            success
            results {
              _id
              createdAt
              description
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
  return response.data.seoHomepage.searchHomepages;
}
