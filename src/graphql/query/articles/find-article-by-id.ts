import {getCookie} from 'cookies-next';

import {CookieName} from '@/constants';
import {gqlFetch} from '@/services/fetch';

import {ArticleQuery, FindArticleInput} from '../../generated/types';

export async function findArticleById(
  input: FindArticleInput,
): Promise<ArticleQuery['findArticleById']> {
  const clientId = getCookie(CookieName.CLIENT_ID) as string;
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindArticleById($input: FindArticleInput!) {
      article {
        findArticleById(input: $input) {
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
            _id   
            quiz{
            _id
            title
            }
            graphicalQuiz{
            _id
            title
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
          success
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
  return response.data;
}
