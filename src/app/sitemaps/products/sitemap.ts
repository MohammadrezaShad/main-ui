import type {MetadataRoute} from 'next';

import {ProductType, StatusType} from '@/graphql/generated/types';
import {searchProducts} from '@/graphql/query/products/search-products';
import {formatAnyDateToYYYYMMDD} from '@/utils/format-any-date-to-yyyymmdd';

export const DEFAULT_SITEMAP_COUNT = 50000;
export const DEFAULT_SITEMAP_PAGE = 1;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data: any = await searchProducts({
    status: StatusType.Publish,
    count: DEFAULT_SITEMAP_COUNT,
    page: DEFAULT_SITEMAP_PAGE,
    isActive: true,
  });
  const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

  const products: Array<ProductType> = data?.results || [];
  const sitemaps: MetadataRoute.Sitemap = products.map(product => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`,
    lastModified: formatAnyDateToYYYYMMDD(product.updatedAt || new Date()),
    images: product.thumbnail?._id
      ? [`${IMAGE_STORAGE_URL}/${product.thumbnail?.filename}-${product.thumbnail?._id}`]
      : [],
  }));

  sitemaps.unshift({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
    lastModified: '',
    images: [],
  });

  return sitemaps;
}
