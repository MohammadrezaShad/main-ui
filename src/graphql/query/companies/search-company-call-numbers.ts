import {CompanyQuery, GetCompanyCallNumbersInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function getCompanyCallnumbers(
  input: GetCompanyCallNumbersInput,
): Promise<CompanyQuery['getCompanyCallNumbers']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query Company($input: GetCompanyCallNumbersInput!) {
              company {
                getCompanyCallNumbers(input: $input)
              }
            }`,
    variables: {input},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data.company.getCompanyCallNumbers;
}
