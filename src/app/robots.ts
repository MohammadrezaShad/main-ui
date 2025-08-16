import {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/sitemaps/mag/sitemap.xml`,
      `${siteUrl}/sitemaps/mag-category/sitemap.xml`,
      `${siteUrl}/sitemaps/products/sitemap.xml`,
    ],
  };
}
