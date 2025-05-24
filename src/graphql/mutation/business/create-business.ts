import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {CompanyMutation, CreateCompanyInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function createCompany(
  input: CreateCompanyInput,
): Promise<CompanyMutation['createCompany']> {
  const token = getCookie(CookieName.AUTH_TOKEN);
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `mutation CreateCompany($input: CreateCompanyInput!) {
              company {
                createCompany(input: $input) {
                  success
                }
              }
            }`,
    variables: {input},
    headers: {Authorization: `Bearer ${token}`},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.company.createCompany;
}
