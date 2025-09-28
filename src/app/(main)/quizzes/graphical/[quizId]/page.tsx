/* eslint-disable no-nested-ternary */
// app/quizzes/graphical/[quizId]/page.tsx
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import type {Metadata} from 'next';
import {cookies, headers} from 'next/headers';

import {GraphicalQuizView} from '@/components';
import {CookieName} from '@/constants';
import {findGraphicalQuizById} from '@/graphql';
import type {GraphicalQuizQuery} from '@/graphql/generated/types';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {gqlFetch} from '@/services/fetch';

// Keep fresh if you want — otherwise remove this.
export const dynamic = 'force-dynamic';

/* ---------------------------------- SEO ---------------------------------- */

export async function generateMetadata({params}: {params: {quizId: string}}): Promise<Metadata> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const origin = `${proto}://${host}`;
  const url = `${origin}/quizzes/graphical/${params.quizId}`;

  const cookieStore = await cookies();
  const token = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const clientId = cookieStore.get(CookieName.CLIENT_ID)?.value || '';

  // Defaults (safe fallbacks)
  let title = 'Graphical Quiz';
  let description =
    'Practice an image-based water treatment quiz. Identify equipment, processes, and real-world scenarios.';
  let ogImageUrl = `${origin}/og/quizzes-graphical.png`;

  // Fetch minimal quiz data for SEO
  try {
    const QUERY = `
      query FindGraphicalQuizById($input: FindGraphicalQuizInput!) {
        graphicalQuiz {
          findGraphicalQuizById(input: $input) {
            success
            result {
              _id
              title
              duration
              reward
              price
              thumbnail { _id filename }
              image { _id filename }
              updatedAt
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
      const quiz = json?.data?.graphicalQuiz?.findGraphicalQuizById?.result;

      if (quiz) {
        title = quiz.title || title;

        // Compose a compact, helpful description
        const bits: string[] = [];
        if (quiz.duration) bits.push(`${quiz.duration} min`);
        if (quiz.reward) bits.push(`Reward: ${quiz.reward}`);
        description = `Graphical quiz: ${title}${bits.length ? ` • ${bits.join(' · ')}` : ''}.`;

        // Prefer thumbnail; fallback to main image; then site OG
        const storage = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL || origin;
        if (quiz?.thumbnail?._id && quiz?.thumbnail?.filename) {
          ogImageUrl = `${storage}/${quiz.thumbnail.filename}-${quiz.thumbnail._id}`;
        } else if (quiz?.image?._id && quiz?.image?.filename) {
          ogImageUrl = `${storage}/${quiz.image.filename}-${quiz.image._id}`;
        }
      }
    }
  } catch {
    // silent fallback
  }

  return {
    // Keep only the page title here; let your root layout append “ • Waterlyst”
    title,
    description,
    alternates: {canonical: url},
    robots: {index: true, follow: true},
    keywords: [
      'graphical quiz',
      'image quiz',
      'water treatment quiz',
      'process diagrams',
      'membrane systems',
      'equipment identification',
      'contaminants',
      'Waterlyst',
    ],
    openGraph: {
      type: 'website',
      url,
      title, // just the page title
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
  const clientId = cookieStore.get(CookieName.CLIENT_ID)?.value || '';

  const queryClient = getQueryClient();

  // Prefetch the quiz for instant, hydrated render
  const queryKey = ['find-graphical-quiz-by-id', params.quizId] as const;
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => findGraphicalQuizById({id: params.quizId}, authToken),
    staleTime: 60_000,
  });

  // Reuse the prefetched data to build JSON-LD (avoid a second fetch)
  const prefetched =
    queryClient.getQueryData<GraphicalQuizQuery['findGraphicalQuizById']>(queryKey);
  const quiz = prefetched?.result;

  // Build JSON-LD safely with fallbacks
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const origin = `${proto}://${host}`;
  const url = `${origin}/quizzes/graphical/${params.quizId}`;
  const storage = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL || origin;

  const name = quiz?.title || 'Graphical Quiz';
  const timeRequired = quiz?.duration ? `PT${Number(quiz.duration)}M` : undefined;
  const primaryImage = (
    quiz?.thumbnail?._id && quiz?.thumbnail?.filename
      ? `${storage}/${quiz.thumbnail.filename}-${quiz.thumbnail._id}`
      : quiz?.image?._id && quiz?.image?.filename
        ? `${storage}/${quiz.image.filename}-${quiz.image._id}`
        : `${origin}/og/quizzes-graphical.png`
  ) as string;

  // MainEntity (Quiz)
  const quizLD = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name,
    description: quiz?.title
      ? `Graphical quiz: ${quiz.title}${quiz?.duration ? ` • ${quiz.duration} min` : ''}.`
      : 'Graphical water treatment quiz.',
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

  // WebPage describing the quiz
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

  // Breadcrumbs
  const breadcrumbLD = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Quizzes',
        item: `${origin}/quizzes`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Graphical Quizzes',
        item: `${origin}/quizzes/graphical`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name,
        item: url,
      },
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
        maxWidth: 'full',
        p: {lgDown: 0},
      })}
    >
      {/* JSON-LD (Quiz, WebPage, Breadcrumbs) */}
      <script
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(quizLD),
        }}
      />
      <script
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageLD),
        }}
      />
      <script
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLD),
        }}
      />

      <Hydrate state={dehydratedState}>
        <GraphicalQuizView />
      </Hydrate>
    </div>
  );
};

export default Page;
