import {CookieName} from '@/constants';
import {GetUserVisitsInput, VisitStatisticsQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';
import {getCookie} from 'cookies-next';

export async function getUserVisits(
  input: GetUserVisitsInput,
  token: string,
): Promise<VisitStatisticsQuery['getUserVisits']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query GetUserVisits($input: GetUserVisitsInput!) {
        visitStatistics {
          getUserVisits(input: $input) {
            success
            totalCount
            totalPages
            results {
              _id
              clientId
              createdAt
              updatedAt
              user {
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
              article {
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
                  displayName
                  email
                  firstName
                  lastName
                  nickname
                  username
                }
                categories {
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
                  slug
                  title
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
        }
      }`,
    variables: {input},
    headers: {Authorization: `Bearer ${token}`, 'client-id': clientId},
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  // if (response.errors?.[0]?.message) {
  //   throw new Error(response.errors?.[0]?.message);
  // }
  return response.data.visitStatistics.getUserVisits;
}
