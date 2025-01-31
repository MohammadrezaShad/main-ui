import {CountryQuery, SearchCountryInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function searchCountries(
  input: SearchCountryInput,
): Promise<CountryQuery['searchCountries']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchCountries($input: SearchCountryInput!) {
  country {
    searchCountries(input: $input) {
      totalPages
      totalCount
      success
      results {
        _id
        cca2
        cca3
        createdAt
        name
        officialName
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
  // if (response.errors?.[0]?.message) {
  //   throw new Error(response.errors?.[0]?.message);
  // }
  return response.data.country.searchCountries;
}
