import type {MetadataRoute} from 'next';

import {CategoryType, SearchSortType} from '@/graphql/generated/types';
import {searchCategories} from '@/graphql/query/categories/search-categories';
import {formatAnyDateToYYYYMMDD} from '@/utils/format-any-date-to-yyyymmdd';

export const DEFAULT_SITEMAP_COUNT = 50000;
export const DEFAULT_SITEMAP_PAGE = 1;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data: any = await searchCategories({
    count: DEFAULT_SITEMAP_COUNT,
    page: DEFAULT_SITEMAP_PAGE,
    sortType: SearchSortType.AscendingOrder,
  });

  const categories: Array<CategoryType> = data?.category!.searchCategories.results || [];
  const sitemaps: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/categories/${category.slug}`,
    lastModified: formatAnyDateToYYYYMMDD(category.updatedAt || new Date()),
    images: [],
  }));

  sitemaps.unshift({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/categories`,
    lastModified: '',
    images: [],
  });
  return sitemaps;
}
