import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import type {Metadata} from 'next';
import {headers} from 'next/headers';

import {QuizzesView} from '@/components';
import {getTopQuizzes} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

// Optional: keep if you want fresh data on each request
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const origin = `${proto}://${host}`;

  const url = `${origin}/quizzes`;
  const title = 'Top Quizzes';
  const description =
    'Discover Waterlyst’s most popular quizzes across filtration, RO, desalination, and water quality. Challenge yourself and track your progress.';

  const images = [
    {
      url: `${origin}/og/quizzes-top.png`,
      width: 1200,
      height: 630,
      alt: 'Top Quizzes on Waterlyst',
    },
  ];

  return {
    title,
    description,
    alternates: {canonical: url},
    robots: {index: true, follow: true},
    keywords: [
      'top quizzes',
      'popular water quizzes',
      'water treatment',
      'reverse osmosis',
      'filtration',
      'desalination',
      'water quality',
    ],
    openGraph: {
      type: 'website',
      url,
      title,
      siteName: 'Waterlyst',
      description,
      images,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map(i => i.url),
    },
  };
}

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-top-quizzes'],
    queryFn: () => getTopQuizzes(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        rowGap: 8,
        mx: 'auto',
        maxWidth: '960px',
        p: {lgDown: 4},
      })}
    >
      <Hydrate state={dehydratedState}>
        <QuizzesView />
      </Hydrate>
    </div>
  );
};

export default Page;
