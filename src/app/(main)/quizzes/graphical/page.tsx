// app/(public)/quizzes/graphical/page.tsx
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import type {Metadata} from 'next';
import {cookies, headers} from 'next/headers';

import {GraphicalQuizzesView} from '@/components';
import {CookieName} from '@/constants';
import {searchGraphicalQuizzes} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const origin = `${proto}://${host}`;

  const url = `${origin}/quizzes/graphical`;
  const title = 'Graphical Quizzes';
  const description =
    'Learn visually with image-based quizzes covering equipment, process diagrams, contaminants, and real-world water treatment scenarios.';

  const images = [
    {
      url: `${origin}/og/quizzes-graphical.png`,
      width: 1200,
      height: 630,
      alt: 'Graphical Quizzes on Waterlyst',
    },
  ];

  return {
    title,
    description,
    alternates: {canonical: url},
    robots: {index: true, follow: true},
    keywords: [
      'graphical quizzes',
      'image quizzes',
      'water treatment visuals',
      'process diagrams',
      'membrane systems',
      'contaminants',
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
    twitter: {card: 'summary_large_image', title, description, images: images.map(i => i.url)},
  };
}

export const dynamic = 'force-dynamic';

// Strong type for one page of results
type GraphicalPage = Awaited<ReturnType<typeof searchGraphicalQuizzes>>;

const Page = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';

  const queryClient = getQueryClient();

  // IMPORTANT: key & fn signature must match the client exactly
  await queryClient.prefetchInfiniteQuery<
    GraphicalPage,
    Error,
    GraphicalPage,
    readonly ['search-graphical-quizzes', {count: number}],
    number
  >({
    queryKey: ['search-graphical-quizzes', {count: 12}] as const,
    queryFn: ({pageParam = 1}) => searchGraphicalQuizzes({count: 12, page: pageParam}, authToken),
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
        paddingBottom: 5,
      })}
    >
      <Hydrate state={dehydratedState}>
        <GraphicalQuizzesView />
      </Hydrate>
    </div>
  );
};

export default Page;
