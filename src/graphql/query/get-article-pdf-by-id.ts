import {gqlFetch} from '@/services/fetch';

export async function getArticlePdfById(input: string): Promise<string> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query Article($input: String!) {
        article {
          getArticlePdfById(input: $input)
        }
      }`,
    variables: {input},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data;
}
