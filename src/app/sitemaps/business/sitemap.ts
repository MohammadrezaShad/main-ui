import type {MetadataRoute} from 'next';

import {searchCompanies} from '@/graphql';
import {CompanyType} from '@/graphql/generated/types';

export const DEFAULT_SITEMAP_COUNT = 50000;
export const DEFAULT_SITEMAP_PAGE = 1;

function joinUrl(base: string, ...parts: string[]) {
  const b = (base || '').replace(/\/+$/, '');
  const p = parts
    .filter(Boolean)
    // encode each path segment safely; keep slashes only from join
    .map(seg => encodeURIComponent(seg.replace(/^\/+|\/+$/g, '')))
    .join('/');
  return b ? `${b}/${p}` : p;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await searchCompanies({
    count: DEFAULT_SITEMAP_COUNT,
    page: DEFAULT_SITEMAP_PAGE,
  });

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL ?? '';

  const companies: CompanyType[] = data?.results ?? [];

  const items: MetadataRoute.Sitemap = companies
    .filter(c => !!c?.slug)
    .map(c => {
      // encode the slug so weird unicode (e.g., “—”) or spaces won’t break XML
      const encodedSlug = encodeURIComponent(String(c.slug));
      const url = joinUrl(BASE_URL, 'business', encodedSlug);

      // let Next.js serialize the date correctly
      const lastModified = c.updatedAt ? new Date(c.updatedAt) : new Date();

      // build optional image URL if we have both filename and id
      let images: string[] | undefined;
      const fname = c.cover?.filename;
      const fid = c.cover?._id;
      if (IMAGE_STORAGE_URL && fname && fid) {
        const imageUrl = joinUrl(IMAGE_STORAGE_URL, `${fname}-${fid}`);
        images = [imageUrl];
      }

      return {
        url,
        lastModified,
        images,
      };
    });

  return items;
}
