import type {MetadataRoute} from 'next';

import {gqlFetch} from '@/services/fetch';
import {formatAnyDateToYYYYMMDD} from '@/utils/format-any-date-to-yyyymmdd';

export const revalidate = 3600; // hourly

export const DEFAULT_SITEMAP_COUNT = 50_000;
export const DEFAULT_SITEMAP_PAGE = 1;

// Purposefully avoid cookies/auth here so the sitemap can be generated publicly.
async function fetchGraphicalQuizzes(page = DEFAULT_SITEMAP_PAGE, count = DEFAULT_SITEMAP_COUNT) {
  const query = `
    query SearchGraphicalQuizzes($input: SearchGraphicalQuizInput!) {
      graphicalQuiz {
        searchGraphicalQuizzes(input: $input) {
          success
          totalCount
          totalPages
          results {
            _id
            createdAt
            updatedAt
            thumbnail {
              _id
              filename
            }
          }
        }
      }
    }
  `;

  const res = await gqlFetch({
    url: process.env.NEXT_PUBLIC_API as string,
    query,
    variables: {input: {page, count}},
  });

  if (!res.ok) throw new Error('Failed to fetch graphical quizzes for sitemap');
  const json = await res.json();
  return (
    json?.data?.graphicalQuiz?.searchGraphicalQuizzes ?? {results: [], totalPages: 1, totalCount: 0}
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

  // Single-shot fetch up to 50k (consistent with your pattern)
  const data = await fetchGraphicalQuizzes();

  const results = data?.results ?? [];

  const urls: MetadataRoute.Sitemap = results.map((quiz: any) => ({
    url: `${baseUrl}/quizzes/graphical/${quiz._id}`,
    lastModified: formatAnyDateToYYYYMMDD(quiz.updatedAt || quiz.createdAt || new Date()),
    images:
      quiz?.thumbnail?._id && quiz?.thumbnail?.filename
        ? [`${IMAGE_STORAGE_URL}/${quiz.thumbnail.filename}-${quiz.thumbnail._id}`]
        : [],
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Listing page
  urls.unshift({
    url: `${baseUrl}/quizzes/graphical`,
    lastModified: formatAnyDateToYYYYMMDD(new Date()),
    changeFrequency: 'daily',
    priority: 0.7,
  });

  return urls;
}
