import type {MetadataRoute} from 'next';

import {ArticleType, StatusType} from '@/graphql/generated/types';
import {searchArticles} from '@/graphql/query/articles';
import {formatAnyDateToYYYYMMDD} from '@/utils/format-any-date-to-yyyymmdd';

export const DEFAULT_SITEMAP_COUNT = 50000;
export const DEFAULT_SITEMAP_PAGE = 1;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data: any = await searchArticles({
    status: StatusType.Publish,
    count: DEFAULT_SITEMAP_COUNT,
    page: DEFAULT_SITEMAP_PAGE,
    hasPdf: false,
  });
  const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

  const articles: Array<ArticleType> = data.article!.searchArticles.results;
  const sitemaps: MetadataRoute.Sitemap = articles.map(paper => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${paper.slug}`,
    lastModified: formatAnyDateToYYYYMMDD(paper.updatedAt || new Date()),
    images: paper.thumbnail?._id
      ? [`${IMAGE_STORAGE_URL}/${paper.thumbnail?.filename}-${paper.thumbnail?._id}`]
      : [],
  }));
  sitemaps.unshift({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles`,
    lastModified: '',
    images: [],
  });

  return sitemaps;
}
