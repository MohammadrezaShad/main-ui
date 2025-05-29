import {CompanyQuery, GetCompanyLocationClicksInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function getCompanyLocationClicks(
  input: GetCompanyLocationClicksInput,
): Promise<CompanyQuery['getCompanyLocationClicks']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query Company($input: GetCompanyLocationClicksInput!) {
              company {
                getCompanyLocationClicks(input: $input)
              }
            }`,
    variables: {input},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data.company.getCompanyLocationClicks;
}
