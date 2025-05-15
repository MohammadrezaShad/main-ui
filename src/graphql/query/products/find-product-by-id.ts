import {FindProductInput, ProductQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function findProductById(
  input: FindProductInput,
): Promise<ProductQuery['findProductById']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindProductById($input: FindProductInput!) {
                product {
                  findProductById(input: $input) {
                    success
                    result {
                      _id
                      about
                      status
                      category {
                        _id
                        image {
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
                        slug
                        title
                        variationAttributes {
                          icon
                          isRequired
                          name
                          options
                          type
                        }
                      }
                      createdAt
                      features {
                        icon
                        name
                        value
                      }
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
                        title
                        slug
                        rate
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
                          name
                          value
                        }
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
  return response.data.product.findProductById;
}
