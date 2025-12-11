import {css} from '@styled/css';
import type {Metadata} from 'next';

import {CategoriesView} from '@/components';
import {searchCategories, SearchSortType} from '@/graphql';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Article Categories | WaterLyst – Water Treatment, Products & Training',
  description:
    'Browse all article categories on WaterLyst, including Products, Water Treatment, Training and more. Explore structured resources on water quality, treatment technologies, system design, and professional training.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/categories`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Article Categories | WaterLyst',
    description:
      'Discover all WaterLyst article categories, from products and water treatment to training and professional resources.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/categories`,
    siteName: 'WaterLyst',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'WaterLyst Article Categories',
    description:
      'Explore all WaterLyst article categories on products, water treatment, training and more.',
  },
};

const Page = async () => {
  const data = await searchCategories({
    count: 150,
    sortType: SearchSortType.AscendingOrder,
  });

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        rowGap: 8,
        mx: 'auto',
        maxWidth: '1200px',
        p: {lgDown: 4},
      })}
    >
      <CategoriesView hasPdf={false} data={data} />
    </div>
  );
};

export default Page;
