import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {SearchTagInput, TagQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function SearchTags(input: SearchTagInput): Promise<TagQuery['searchTags']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchTags($input: SearchTagInput!) {
      tag {
        searchTags(input: $input) {
          success
          totalCount
          totalPages
          results {
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
              createdAt
              description
              hasSeoApproval
              isDescriptionApproved
              originalDescription
              postCount
              slug
              status
              title
              updatedAt
            }
            postCount
            seoReviewDate
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
    headers: {
      'client-id': clientId,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.tag.searchTags;
}
