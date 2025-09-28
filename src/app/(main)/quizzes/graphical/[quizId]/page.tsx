/* eslint-disable no-nested-ternary */
// app/quizzes/graphical/[quizId]/page.tsx
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import type {Metadata} from 'next';
import {cookies, headers} from 'next/headers';

import {GraphicalQuizView} from '@/components';
import {CookieName} from '@/constants';
import type {GraphicalQuizQuery} from '@/graphql/generated/types';
import {findGraphicalQuizById} from '@/graphql/query/quiz/find-graphical-quiz-by-id';
import {findQuizByPoint} from '@/graphql/query/quiz/find-quiz-by-point';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export const dynamic = 'force-dynamic';

export async function generateMetadata({params}: {params: {quizId: string}}): Promise<Metadata> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const origin = `${proto}://${host}`;
  const url = `${origin}/quizzes/graphical/${params.quizId}`;

  const title = 'Graphical Quiz';
  const description =
    'Practice an image-based water treatment quiz. Identify equipment, processes, and real-world scenarios.';

  return {
    title,
    description,
    alternates: {canonical: url},
    openGraph: {
      type: 'website',
      url,
      title,
      siteName: 'Waterlyst',
      description,
      images: [{url: `${origin}/og/quizzes-graphical.png`, width: 1200, height: 630}],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${origin}/og/quizzes-graphical.png`],
    },
  };
}

const Page = async ({params}: {params: {quizId: string}}) => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const clientId = cookieStore.get(CookieName.CLIENT_ID)?.value || '';

  const queryClient = getQueryClient();

  // 1) Prefetch parent graphical quiz
  const quizKey = ['find-graphical-quiz-by-id', params.quizId] as const;
  await queryClient.prefetchQuery({
    queryKey: quizKey,
    queryFn: () => findGraphicalQuizById({id: params.quizId}, authToken, clientId),
    staleTime: 60_000,
  });

  // 2) Prefetch the FIRST sub-quiz by point so hydration has it ready
  const prefetched = queryClient.getQueryData<GraphicalQuizQuery['findGraphicalQuizById']>(quizKey);
  const firstPoint = prefetched?.result?.quizPoints?.[0]?.point;
  if (firstPoint) {
    const byPointKey = ['find-quiz-by-point', params.quizId, firstPoint.x, firstPoint.y] as const;
    await queryClient.prefetchQuery({
      queryKey: byPointKey,
      queryFn: () => findQuizByPoint({id: params.quizId, point: firstPoint}, authToken, clientId),
      staleTime: 60_000,
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        rowGap: 8,
        mx: 'auto',
        maxWidth: 'full',
        p: {lgDown: 0},
      })}
    >
      <Hydrate state={dehydratedState}>
        <GraphicalQuizView />
      </Hydrate>
    </div>
  );
};

export default Page;
