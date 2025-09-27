import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import type {Metadata} from 'next';
import {unstable_noStore as noStore} from 'next/cache';
import {headers} from 'next/headers';

import {ProductsView} from '@/components';
import {searchProducts, StatusType} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: {
    page?: string;
    categories?: string;
    city?: string;
    minimumCompanyRating?: string;
    minimumProductRating?: string;
    lowPrice?: string;
    highPrice?: string;
  };
}

export async function generateMetadata({searchParams}: Props): Promise<Metadata> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const origin = `${proto}://${host}`;

  const {
    page = '1',
    categories = '',
    city = '',
    minimumCompanyRating = '',
    minimumProductRating = '',
    lowPrice = '',
    highPrice = '',
  } = (await searchParams) || {};

  const parts: string[] = [];
  if (categories) parts.push(`Categories: ${categories.split(',').filter(Boolean).length}`);
  if (city) parts.push(`City: ${city}`);
  if (minimumCompanyRating) parts.push(`Company ≥ ${minimumCompanyRating}`);
  if (minimumProductRating) parts.push(`Product ≥ ${minimumProductRating}`);
  if (lowPrice || highPrice) parts.push(`Price: ${lowPrice || '0'}–${highPrice || '∞'}`);
  parts.push(`Page ${page}`);

  const titleBase = 'Search Products'; // no site name here (layout template can add it)
  const dynamicTitle = parts.length ? `${titleBase} (${parts.join(' · ')})` : titleBase;

  const qs = new URLSearchParams(
    Object.entries({
      page,
      categories,
      city,
      minimumCompanyRating,
      minimumProductRating,
      lowPrice,
      highPrice,
    }).filter(([, v]) => v && String(v).trim() !== ''),
  ).toString();
  const url = `${origin}/products${qs ? `?${qs}` : ''}`;

  const description = parts.length
    ? `Browse water treatment products filtered by ${parts.join(', ')}. Compare ratings, prices, and vendors.`
    : 'Browse water treatment products. Compare ratings, prices, and vendors.';

  const images = [
    {
      url: `${origin}/og/search.png`,
      width: 1200,
      height: 630,
      alt: 'Search Products',
    },
  ];

  return {
    title: dynamicTitle,
    description,
    alternates: {canonical: url},
    keywords: [
      'water filter',
      'whole house',
      'reverse osmosis',
      'water treatment',
      'purifier',
      'Waterlyst',
    ],
    robots: {index: true, follow: true},
    openGraph: {
      type: 'website',
      url,
      title: dynamicTitle,
      description,
      siteName: 'Waterlyst',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: dynamicTitle,
      description,
      images: images.map(i => i.url),
    },
  };
}

const Page = async ({searchParams: initialSearchParams}: Props) => {
  const sp = (await initialSearchParams) || {};

  noStore();

  // keep these as strings to match client queryKey exactly
  const page = sp.page ?? '1';
  const categories = sp.categories ?? '';
  const city = sp.city ?? '';
  const minimumCompanyRating = sp.minimumCompanyRating ?? '';
  const minimumProductRating = sp.minimumProductRating ?? '';
  const lowPrice = sp.lowPrice ?? '';
  const highPrice = sp.highPrice ?? '';

  const queryClient = getQueryClient();

  // server prefetch with the same key shape (all strings)
  await queryClient.prefetchQuery({
    queryKey: [
      'search-products',
      page,
      categories,
      city,
      minimumCompanyRating,
      minimumProductRating,
      lowPrice,
      highPrice,
    ],
    queryFn: () =>
      searchProducts({
        page: Number(page || '1') || 1,
        count: 8,
        categories: categories ? categories.split(',').filter(Boolean) : undefined,
        city: city || undefined,
        minimumCompanyRating: minimumCompanyRating ? Number(minimumCompanyRating) : undefined,
        minimumProductRating: minimumProductRating ? Number(minimumProductRating) : undefined,
        lowPrice: lowPrice ? Number(lowPrice) : undefined,
        highPrice: highPrice ? Number(highPrice) : undefined,
        isActive: true,
        status: 'PUBLISH' as StatusType,
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        rowGap: 8,
        mx: 'auto',
        p: {lgDown: 4},
      })}
    >
      <Hydrate state={dehydratedState}>
        <ProductsView />
      </Hydrate>
    </div>
  );
};

export default Page;
