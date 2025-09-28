import {QuizQuery, SearchQuizInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function searchQuizzes(input: SearchQuizInput): Promise<QuizQuery['searchQuizzes']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchQuizzes($input: SearchQuizInput!) {
        quiz {
          searchQuizzes(input: $input) {
            success
            totalCount
            totalPages
            results {
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
                seoReviewDate
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
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response.errors?.[0]?.message) {
    throw new Error(response.errors?.[0]?.message);
  }
  return response.data.quiz.searchQuizzes;
}
