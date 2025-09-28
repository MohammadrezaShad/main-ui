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
  const title = 'Quizzes'; // <-- rely on layout template to add " • Waterlyst"
  const description =
    'Test your water knowledge with interactive quizzes on filtration, treatment methods, contaminants, and more.';

  const images = [
    {url: `${origin}/og/quizzes.png`, width: 1200, height: 630, alt: 'Waterlyst Quizzes'},
  ];

  return {
    title,
    description,
    alternates: {canonical: url},
    openGraph: {
      type: 'website',
      url,
      title, // no site name here
      siteName: 'Waterlyst',
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title, // no site name here
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
