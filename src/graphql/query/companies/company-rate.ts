// src/services/product-rating.ts
import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants/coooki-name.enum';
import {CompanyMutation, CreateCompanyRatingInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function giveRating(
  input: CreateCompanyRatingInput,
): Promise<CompanyMutation['giveRating']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;

  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `mutation GiveRating($input: CreateCompanyRatingInput!) {
  company {
    giveRating(input: $input) {
      success
    }
  }
}`,
    variables: {input},
    headers: {
      'client-id': clientId,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  const json = await res.json();
  // If your server returns GraphQL errors, surface the first one:
  if (json?.errors?.[0]?.message) throw new Error(json.errors[0].message);

  return json?.data?.company?.giveRating; // { success: boolean }
}
