import {FindProductBySlugInput, ProductQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function findProductBySlug(
  input: FindProductBySlugInput,
): Promise<ProductQuery['findProductBySlug']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindProductBySlug($input: FindProductBySlugInput!) {
            product {
                findProductBySlug(input: $input) {
                success
                result {
                    _id
                    view
                    redirect
                    about
                    amazon
                    callNumber
                    website
                    category {
                    _id
                    slug
                    title
                    }
                    createdAt
                    eBay
                    features {
                    icon
                    isMainFeature
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
                    latitude
                    longitude
                    _id
                    title
                    slug
                    website
                    callNumber
                    country {
                        name
                        _id
                    }
                    city {
                        _id
                        name
                    }
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
                    wallmart
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
  return response.data.product.findProductBySlug;
}
