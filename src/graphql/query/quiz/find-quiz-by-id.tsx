import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {FindQuizInput, QuizQuery} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function findQuizById(
  input: FindQuizInput,
  token?: string,
): Promise<QuizQuery['findQuizById']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindQuizById($input: FindQuizInput!) {
        quiz {
          findQuizById(input: $input) {
            success
            result {
              __typename
              _id
              category {
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
              createUser {
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
              createdAt
              duration
              price
              questions {
                _id
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
                createUser {
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
                createdAt
                options {
                  answer
                  isCorrect
                }
                question
                updateUser {
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
                updatedAt
              }
              reward
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
              updateUser {
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
              updatedAt
            }
          }
        }
      }`,
    variables: {input},
    headers: {
      Authorization: `Bearer ${token}`,
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
  return response.data.quiz.findQuizById;
}
