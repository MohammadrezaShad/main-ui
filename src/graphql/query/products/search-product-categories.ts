import {ProductCategoryQuery, SearchProductCategoryInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function searchProductCategories(
  input: SearchProductCategoryInput,
): Promise<ProductCategoryQuery['searchCategories']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchCategories($input: SearchProductCategoryInput!) {
  productCategory {
    searchCategories(input: $input) {
      totalPages
      totalCount
      success
      results {
        _id
        title
        slug
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
  return response.data.productCategory.searchCategories;
}
