// app/quizzes/normal/[quizId]/page.tsx
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import type {Metadata} from 'next';
import {cookies, headers} from 'next/headers';

import {NormalQuizView} from '@/components';
import {CookieName} from '@/constants';
import {findQuizById} from '@/graphql';
import type {QuizQuery} from '@/graphql/generated/types';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {gqlFetch} from '@/services/fetch';

export const dynamic = 'force-dynamic';

/* ---------------------------------- SEO ---------------------------------- */

export async function generateMetadata({params}: {params: {quizId: string}}): Promise<Metadata> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const origin = `${proto}://${host}`;
  const url = `${origin}/quizzes/normal/${params.quizId}`;

  const cookieStore = await cookies();
  const token = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const clientId = cookieStore.get(CookieName.CLIENT_ID)?.value || '';

  // Safe defaults
  let title = 'Normal Quiz';
  let description =
    'Answer multiple-choice water treatment questions. Test your knowledge on processes, contaminants, and standards.';
  let ogImageUrl = `${origin}/og/quizzes-normal.png`;

  // Fetch minimal quiz info for SEO, using a lightweight query
  try {
    const QUERY = `
      query FindQuizById($input: FindQuizInput!) {
        quiz {
          findQuizById(input: $input) {
            result {
              _id
              title
              duration
              reward
              price
              updatedAt
              thumbnail { _id filename }
            }
          }
        }
      }`;

    const res = await gqlFetch({
      url: process.env.NEXT_PUBLIC_API as string,
      query: QUERY,
      variables: {input: {id: params.quizId}},
      headers: {
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
        ...(clientId ? {'client-id': clientId} : {}),
      },
    });

    if (res.ok) {
      const json = await res.json();
      const quiz = json?.data?.quiz?.findQuizById?.result;

      if (quiz) {
        title = quiz.title || title;
        const bits: string[] = [];
        if (quiz.duration) bits.push(`${quiz.duration} min`);
        if (quiz.reward) bits.push(`Reward: ${quiz.reward}`);
        description = `Quiz: ${title}${bits.length ? ` • ${bits.join(' · ')}` : ''}.`;

        const storage = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL || origin;
        if (quiz?.thumbnail?._id && quiz?.thumbnail?.filename) {
          ogImageUrl = `${storage}/${quiz.thumbnail.filename}-${quiz.thumbnail._id}`;
        }
      }
    }
  } catch {
    // keep defaults on any failure
  }

  return {
    // Only the page title; let your root layout append “ • Waterlyst”
    title,
    description,
    alternates: {canonical: url},
    robots: {index: true, follow: true},
    keywords: [
      'quiz',
      'normal quiz',
      'multiple choice quiz',
      'water treatment quiz',
      'drinking water',
      'membrane processes',
      'contaminants',
      'EPA',
      'WHO',
      'Waterlyst',
    ],
    openGraph: {
      type: 'website',
      url,
      title, // page title only
      siteName: 'Waterlyst',
      description,
      images: [{url: ogImageUrl, width: 1200, height: 630, alt: title}],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

/* ----------------------------- Page + JSON-LD ----------------------------- */

const Page = async ({params}: {params: {quizId: string}}) => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';

  const queryClient = getQueryClient();

  const queryKey = ['find-quiz-by-id', params.quizId] as const;

  // Prefetch for instant hydration
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => findQuizById({id: params.quizId}, authToken),
    staleTime: 60_000,
  });

  // Reuse prefetched data to build JSON-LD (no extra network call)
  const prefetched = queryClient.getQueryData<QuizQuery['findQuizById']>(queryKey);
  const quiz = prefetched?.result;

  // Build JSON-LD safely
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const origin = `${proto}://${host}`;
  const url = `${origin}/quizzes/normal/${params.quizId}`;
  const storage = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL || origin;

  const name = quiz?.title || 'Normal Quiz';
  const timeRequired = quiz?.duration ? `PT${Number(quiz.duration)}M` : undefined;
  const primaryImage =
    quiz?.thumbnail?._id && quiz?.thumbnail?.filename
      ? `${storage}/${quiz.thumbnail.filename}-${quiz.thumbnail._id}`
      : `${origin}/og/quizzes-normal.png`;

  const quizLD = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name,
    description: quiz?.title
      ? `Multiple-choice quiz: ${quiz.title}${quiz?.duration ? ` • ${quiz.duration} min` : ''}.`
      : 'Multiple-choice water treatment quiz.',
    url,
    image: [primaryImage],
    inLanguage: 'en',
    isAccessibleForFree: typeof quiz?.price === 'number' ? quiz.price === 0 : true,
    ...(timeRequired ? {timeRequired} : {}),
    provider: {
      '@type': 'Organization',
      name: 'Waterlyst',
      url: origin,
    },
    dateModified: quiz?.updatedAt || undefined,
  };

  const webPageLD = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: primaryImage,
    },
    mainEntity: quizLD,
  };

  const breadcrumbLD = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'Quizzes', item: `${origin}/quizzes`},
      {'@type': 'ListItem', position: 2, name: 'Normal Quizzes', item: `${origin}/quizzes/normal`},
      {'@type': 'ListItem', position: 3, name, item: url},
    ],
  };

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
        overflow: 'hidden',
      })}
    >
      {/* JSON-LD blocks */}
      <script
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: JSON.stringify(quizLD)}}
      />
      <script
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: JSON.stringify(webPageLD)}}
      />
      <script
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbLD)}}
      />

      <Hydrate state={dehydratedState}>
        <NormalQuizView />
      </Hydrate>
    </div>
  );
};

export default Page;
