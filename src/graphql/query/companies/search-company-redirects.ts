import {CompanyQuery, GetCompanyRedirectsInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function getCompanyRedirects(
  input: GetCompanyRedirectsInput,
): Promise<CompanyQuery['getCompanyRedirects']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query GetCompanyRedirects($input: GetCompanyRedirectsInput!) {
              company {
                getCompanyRedirects(input: $input) {
                  wallmart
                  total
                  ebay
                  amazon
                }
              }
            }`,
    variables: {input},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data.company.getCompanyRedirects;
}
