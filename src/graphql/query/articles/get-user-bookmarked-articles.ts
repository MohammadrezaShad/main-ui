import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {gqlFetch} from '@/services/fetch';

import {ArticleQuery, GetUserBookmarkedArticlesInput} from '../..';

export async function getUserBookmarkedArticles(
  input: GetUserBookmarkedArticlesInput,
  token: string,
): Promise<ArticleQuery['getUserBookmarkedArticles']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query GetUserBookmarkedArticles($input: GetUserBookmarkedArticlesInput!) {
        article {
          getUserBookmarkedArticles(input: $input) {
            success
            totalCount
            totalPages
            results {
              _id
              author {
                _id
                articlesWrittenCount
                articlesWrittenSavedCount
                articlesWrittenVisitedCount
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
                coins
                commentsCount
                createdAt
                displayName
                downloadedArticlesCount
                email
                firstName
                gender
                hometown
                isCreatedWithSocialMedia
                isVerified
                lastName
                nickname
                phone
                role
                savedArticlesCount
                timeSpent
                updatedAt
                username
                visitedArticlesCount
                website
              }
              categories {
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
                slug
                title
                updatedAt
              }
              commentsCount
              content
              createdAt
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
              savedCount
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
              tags {
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
                slug
                status
                title
                updatedAt
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
              updatedAt
              visitsCount
            }
          }
        }
      }`,
    variables: {input},
    headers: {authorization: `Bearer ${token}`, 'client-id': clientId},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.article.getUserBookmarkedArticles;
}
