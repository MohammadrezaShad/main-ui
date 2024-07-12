import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {gqlFetch} from '@/services/fetch';

import {type CommentQuery, type SearchCommentInput} from '../../generated/types';

export async function searchComments(
  input: SearchCommentInput,
): Promise<CommentQuery['searchCommentss']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchCommentss($input: SearchCommentInput!) {
        comment {
          searchCommentss(input: $input) {
            totalPages
            totalCount
            success
            results {
              _id
              approved
              author
              authorEmail
              childs {
                _id
                approved
                author
                authorEmail
                content
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
                  commentsCount
                  displayName
                  email
                  expertise
                  firstName
                  hometown
                  lastName
                  nickname
                  phone
                  username
                  website
                }
                createdAt
                isUserLike
                likeCount
                type
                updatedAt
              }
              client
              content
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
                description
                displayName
                downloadedArticlesCount
                education
                email
                engagementCount
                expertise
                facebook
                firstName
                gender
                hometown
                instagram
                isCreatedWithSocialMedia
                isVerified
                lastName
                linkedin
                nickname
                phone
                role
                savedArticlesCount
                showEmail
                telegram
                timeSpent
                twitter
                updatedAt
                username
                visitedArticlesCount
                website
                whatsApp
              }
              createdAt
              isUserLike
              likeCount
              parent {
                _id
              }
              post {
                article {
                  _id
                }
              }
              type
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
  return response.data.comment.searchCommentss;
}
