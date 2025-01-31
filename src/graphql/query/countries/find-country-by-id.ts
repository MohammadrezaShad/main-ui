import {CountryQuery, FindCountryInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function findCountryById(
  input: FindCountryInput,
): Promise<CountryQuery['findCountryById']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindCountryById($input: FindCountryInput!) {
  country {
    findCountryById(input: $input) {
      success
      result {
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
  return response.data.country.findCountryById;
}
