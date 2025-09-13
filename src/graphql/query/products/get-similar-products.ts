import {ProductQuery, SimilarProductInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function getSimilarProducts(
  input: SimilarProductInput,
): Promise<ProductQuery['getSimilarProducts']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query GetSimilarProducts($input: SimilarProductInput!) {
  product {
    getSimilarProducts(input: $input) {
      success
      totalCount
      totalPages
      results {
        _id
        about
        callNumber
        website
        category {
          _id
          title
          slug
        }
        createdAt
        isActive
        rate
        sellerCompany {
          latitude
          longitude
          _id
          callNumber
          city {
            _id
            name
          }
          country {
            _id
            name
          }
          title
          slug
          website
        }
        slug
        thumbnail {
          _id
          alt
          createdAt
          filename
          format
          height
          preview
          updatedAt
          width
        }
        title
        updatedAt
        keywords
        variations {
          _id
          cost
          isAvailable
          stock
        }
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
  return response.data.product.getSimilarProducts;
}
