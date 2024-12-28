import {FindProductCategoryInput, ProductCategoryQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function findProductCategoryById(
  input: FindProductCategoryInput,
): Promise<ProductCategoryQuery['findProductCategoryById']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindProductCategoryById($input: FindProductCategoryInput!) {
  productCategory {
    findProductCategoryById(input: $input) {
      success
      result {
        _id
        slug
        title
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
  return response.data.productCategory.findProductCategoryById;
}
