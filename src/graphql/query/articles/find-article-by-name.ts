import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {gqlFetch} from '@/services/fetch';

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
            images {
              _id
              alt
              createdAt
              filename
              height
              preview
              updatedAt
              width
            }
            updatedAt
            isBookmark
            _id
            quiz {
              _id
              title
              thumbnail {
                _id
                alt
                createdAt
                filename
                format
                height
                preview
                updatedAt
                width
              }
            }
            graphicalQuiz {
              _id
              category {
                _id
                title
                slug
              }
              createdAt
              duration
              price
              reward
              thumbnail {
                _id
                alt
                createdAt
                filename
                format
                height
                preview
                updatedAt
                width
              }
              title
              updatedAt
              youEarned
            }
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
              firstName
              lastName
              username
              website
              facebook
              instagram
              twitter
              linkedin
              telegram
              whatsApp
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
            seoSetting {
              general {
                  title
                  description
                  canonicalUrl
                  permalink
                  focusKeyword
                  nofollow
                  noindex
              }
            }
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
            hasPdf
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
  if (response.errors?.[0]?.message) {
    console.log(response.errors);
    return null as any;
  }
  return response.data;
}
