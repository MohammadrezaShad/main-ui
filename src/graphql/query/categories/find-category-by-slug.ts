import {CategoryQuery, FindCategoryBySlugInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function findCategoryBySlug(
  input: FindCategoryBySlugInput,
): Promise<CategoryQuery['findCategoryBySlug']['result']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindCategoryBySlug($input: FindCategoryBySlugInput!) {
  category {
    findCategoryBySlug(input: $input) {
      success
      result {
        title
        slug
        _id
        description
        originalDescription
        image {
          _id
          filename
          width
          height
          alt
        }
        seoSetting {
          _id
          createdAt
          general {
            canonicalUrl
            description
            focusKeyword
            nofollow
            noindex
            permalink
            title
          }
          itemId
          score
          type
          updatedAt
        }
      }
    }
  }
}
`,
    variables: {input},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  console.log(response?.data?.category?.findCategoryBySlug?.result);
  return response?.data?.category?.findCategoryBySlug?.result;
}
