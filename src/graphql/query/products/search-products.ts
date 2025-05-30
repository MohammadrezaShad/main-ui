import {ProductQuery, SearchProductInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function searchProducts(
  input: SearchProductInput,
): Promise<ProductQuery['searchProducts']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchProducts($input: SearchProductInput!) {
              product {
                searchProducts(input: $input) {
                  success
                  totalCount
                  totalPages
                  results {
                    status
                    _id
                    view
                    redirect
                    about
                    amazon
                    category {
                      _id
                      slug
                      title
                    }
                    createdAt
                    eBay
                    images {
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
                    isActive
                    keywords
                    rate
                    sellerCompany {
                      _id
                      latitude
                      longitude
                      callNumber
                      city {
                        _id
                        name
                      }
                      country {
                        _id
                        name
                      }
                      rate
                      slug
                      title
                      status
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
                    variations {
                      _id
                      cost
                      createdAt
                      isAvailable
                      stock
                      updatedAt
                      variationAttributes {
                        icon
                        isMainFeature
                        name
                        value
                      }
                    }
                    wallmart
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
  return response.data.product.searchProducts;
}
