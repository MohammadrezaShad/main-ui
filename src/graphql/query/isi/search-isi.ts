import {type IsiQuery, type SearchIsiInput} from '@/graphql/generated/types';
import {gqlFetch} from '@/services/fetch';

export async function searchIsi(input: SearchIsiInput): Promise<IsiQuery['searchIsi']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query SearchIsi($input: SearchIsiInput!) {
        isi {
          searchIsi(input: $input) {
            totalPages
            totalCount
            success
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
                articlesWrittenCount
                articlesWrittenSavedCount
                articlesWrittenVisitedCount
                avatarStatus
                coins
                commentsCount
                contact
                createdAt
                description
                displayName
                downloadedArticlesCount
                education
                email
                engagementCount
                expertise
                firstName
                facebook
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
              doi
              journal
              title
              updatedAt
              year
              createUser {
                _id
                username
                lastName
                firstName
              }
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
  return response.data.isi.searchIsi;
}
