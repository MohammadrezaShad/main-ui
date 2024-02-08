import {FindTagBySlugInput, TagQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function FindTagBySlug(input: FindTagBySlugInput): Promise<TagQuery['findTagBySlug']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindTagBySlug($input: FindTagBySlugInput!) {
      tag {
        findTagBySlug(input: $input) {
          success
          result {
            _id
            createdAt
            description
            hasSeoApproval
            image {
              _id
              alt
              createdAt
              filename
              height
              preview
              updatedAt
              width
            }
            isDescriptionApproved
            originalDescription
            parent {
              _id
              image {
                _id
                alt
                createdAt
                filename
                height
                preview
                updatedAt
                width
              }
              postCount
              slug
              status
              title
            }
            postCount
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
            slug
            status
            title
            updatedAt
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
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.tag.findTagBySlug;
}
