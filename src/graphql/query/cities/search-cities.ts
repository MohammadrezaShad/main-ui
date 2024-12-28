import {CityQuery, SearchCityInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function searchCities(input: SearchCityInput): Promise<CityQuery['searchCities']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchCities($input: SearchCityInput!) {
  city {
    searchCities(input: $input) {
      totalPages
      totalCount
      success
      results {
        _id
        name
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
  return response.data.city.searchCities;
}
