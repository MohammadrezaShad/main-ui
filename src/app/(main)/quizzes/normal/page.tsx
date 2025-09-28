import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import type {Metadata} from 'next';
import {unstable_noStore as noStore} from 'next/cache';
import {headers} from 'next/headers';

import {NormalQuizzesView} from '@/components';
import {searchQuizzes} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const origin = `${proto}://${host}`;

  const pathname = '/quizzes';
  const url = `${origin}${pathname}`;

  const title = 'All Quizzes'; // layout should add " • Waterlyst"
  const description =
    'Explore all Waterlyst quizzes—filtration, reverse osmosis, desalination, contaminants, standards (EPA/WHO), and more. Practice from beginner to expert and track your progress.';

  const images = [
    {
      url: `${origin}/og/quizzes-all.png`,
      width: 1200,
      height: 630,
      alt: 'All Quizzes on Waterlyst',
    },
  ];

  return {
    title,
    description,
    alternates: {canonical: url},
    robots: {index: true, follow: true},
    keywords: [
      'quizzes',
      'water quiz',
      'water treatment quiz',
      'reverse osmosis quiz',
      'filtration quiz',
      'desalination quiz',
      'EPA standards',
      'WHO drinking water',
      'membrane processes',
      'drinking water quality',
    ],
    openGraph: {
      type: 'website',
      url,
      title, // page title only; site name comes from layout
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
    other: {
      'og:updated_time': new Date().toISOString(),
      'application-name': 'Waterlyst',
      'theme-color': '#0E7490',
    },
  };
}

export const dynamic = 'force-dynamic';

// Strongly type the infinite query prefetch
type SearchQuizzesOutput = Awaited<ReturnType<typeof searchQuizzes>>;

const Page = async () => {
  noStore();

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery<
    SearchQuizzesOutput, // TQueryFnData
    Error, // TError
    SearchQuizzesOutput, // TData
    readonly ['search-quizzes', {count: number}], // TQueryKey
    number // TPageParam
  >({
    queryKey: ['search-quizzes', {count: 12}] as const, // MUST match client
    queryFn: ({pageParam = 1}) => searchQuizzes({count: 12, page: pageParam}),
    initialPageParam: 1,
    staleTime: 60_000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        rowGap: 8,
        mx: 'auto',
        maxWidth: 'full',
        p: {lgDown: 4},
        overflow: 'hidden',
        paddingBottom: 5,
      })}
    >
      <Hydrate state={dehydratedState}>
        <NormalQuizzesView />
      </Hydrate>
    </div>
  );
};

export default Page;
