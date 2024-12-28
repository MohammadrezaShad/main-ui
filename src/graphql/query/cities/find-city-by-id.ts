import {CityQuery, FindCityInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function findCityById(input: FindCityInput): Promise<CityQuery['findCityById']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindCityById($input: FindCityInput!) {
  city {
    findCityById(input: $input) {
      success
      result {
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
  return response.data.city.findCityById;
}
