import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {CreateProductRedirectInput, ProductRedirectMutation} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function createProductRedirect(
  input: CreateProductRedirectInput,
): Promise<ProductRedirectMutation['createProductRedirect']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const token = getCookie(CookieName.AUTH_TOKEN);
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `mutation CreateProductRedirect($input: CreateProductRedirectInput!) {
              productRedirect {
                createProductRedirect(input: $input) {
                  success
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
  return response.data.productRedirect.createProductRedirect;
}
