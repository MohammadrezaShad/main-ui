import {gqlFetch} from '@/services/fetch';
import {ArticleQuery, FindArticleBySlugInput} from '../generated/types';

export async function findArticleByName(
  input: FindArticleBySlugInput,
): Promise<ArticleQuery['findArticleByName']> {
  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query: `query FindArticleByName($input: FindArticleBySlugInput!) {
      article {
        findArticleByName(input: $input) {
          success
          result {
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
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  return response.data;
}
