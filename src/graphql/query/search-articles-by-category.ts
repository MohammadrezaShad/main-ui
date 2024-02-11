import {gqlFetch} from '@/services/fetch';

import {ArticleQuery, SearchArticleInput} from '../generated/types';

export async function searchArticleByCategory(
  input: SearchArticleInput,
): Promise<ArticleQuery['searchArticles']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchArticles($input: SearchArticleInput!) {
      article {
        searchArticles(input: $input) {
          results {
            _id
            author {
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
            categories {
              _id
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
              slug
              title
            }
            commentsCount
            content
            excerpt
            faqs {
              answer
              question
            }
            isBookmark
            isUserFavorite
            likeCount
            publishDate
            readingDuration
            reports
            slug
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
            status
            tags {
              _id
              description
              originalDescription
              postCount
              slug
              status
              title
            }
            thumbnail {
              _id
              alt
              createdAt
              filename
              height
              preview
              updatedAt
              width
            }
            title
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
  return response.data;
}
