import {CompanyCategoryQuery, SearchCompanyCategoryInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function searchCompanyCategories(
  input: SearchCompanyCategoryInput,
): Promise<CompanyCategoryQuery['searchCategories']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchCompanyCategories($input: SearchCompanyCategoryInput!) {
      companyCategory {
        searchCategories(input: $input) {
          results {
            _id
            order
            createUser {
              _id
              avatarStatus
              createdAt
              displayName
              email
              isCreatedWithSocialMedia
              isVerified
              phone
              role
              updatedAt
              username
              avatar {
                _id
                alt
                createdAt
                filename
                height
                preview
                updatedAt
                width
              }
            }
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
            title
            updateUser {
              _id
              avatar {
                _id
                alt
                createdAt
                filename
                height
                preview
                updatedAt
                width
              }
              avatarStatus
              createdAt
              displayName
              email
              isCreatedWithSocialMedia
              isVerified
              phone
              role
              updatedAt
              username
            }
            updatedAt
            parent {
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
              title
              updatedAt
            }
          }
          success
          totalCount
          totalPages
        }
      }
    }`,
    variables: {input},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data.companyCategory.searchCategories;
}
