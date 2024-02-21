import {gqlFetch} from '@/services/fetch';

import {CookieName} from '@/constants';
import {getCookie} from 'cookies-next';
import {ArticleQuery, FindArticleBySlugInput} from '../../generated/types';

export async function findArticleByName(
  input: FindArticleBySlugInput,
  token?: string,
): Promise<ArticleQuery['findArticleByName']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindArticleByName($input: FindArticleBySlugInput!) {
      article {
        findArticleByName(input: $input) {
          success
          result {
            isBookmark
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
              isVerified
              username
            }
            categories {
              _id
              slug
              title
            }
            content
            excerpt
            faqs {
              question
              answer
            }
            publishDate
            readingDuration
            slug
            status
            tags {
              _id
              title
              slug
            }
            thumbnail {
              _id
              alt
              filename
              height
              width
            }
            title
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
  return response.data;
}
