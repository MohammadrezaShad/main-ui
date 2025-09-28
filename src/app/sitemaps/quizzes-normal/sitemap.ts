import type {MetadataRoute} from 'next';

import {searchQuizzes} from '@/graphql'; // your existing function
import {formatAnyDateToYYYYMMDD} from '@/utils/format-any-date-to-yyyymmdd';

export const revalidate = 3600; // re-gen hourly like your other maps

export const DEFAULT_SITEMAP_COUNT = 50_000;
export const DEFAULT_SITEMAP_PAGE = 1;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

  // Pull as many as the sitemap limit allows in a single call (like your articles map)
  const data = await searchQuizzes({
    count: DEFAULT_SITEMAP_COUNT,
    page: DEFAULT_SITEMAP_PAGE,
  });

  // shape: QuizQuery['searchQuizzes']
  const results = data?.results ?? [];

  const urls: MetadataRoute.Sitemap = results.map(quiz => ({
    url: `${baseUrl}/quizzes/normal/${quiz._id}`,
    lastModified: formatAnyDateToYYYYMMDD(quiz.updatedAt || quiz.createdAt || new Date()),
    images:
      quiz?.thumbnail?._id && quiz?.thumbnail?.filename
        ? [`${IMAGE_STORAGE_URL}/${quiz.thumbnail.filename}-${quiz.thumbnail._id}`]
        : [],
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Add listing page itself
  urls.unshift({
    url: `${baseUrl}/quizzes/normal`,
    lastModified: formatAnyDateToYYYYMMDD(new Date()),
    changeFrequency: 'daily',
    priority: 0.7,
  });

  return urls;
}
