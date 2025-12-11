import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import type {Metadata} from 'next';
import {cookies} from 'next/headers';

import {AuthorView} from '@/components';
import {CookieName} from '@/constants';
import {findUserById, searchArticlesByAuthorId, type User} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const qk = {
  user: (id: string) => ['author', 'user', id] as const,
  articles: (id: string) => ['author', 'articles', id] as const,
};

type AuthorPageParams = {
  params: {
    authorId: string;
  };
};

const getAuthorName = (author: User | null | undefined): string => {
  if (!author) return 'Unknown Author';
  if (author.displayName) return author.displayName;
  if (author.firstName && author.lastName) return `${author.firstName} ${author.lastName}`;
  if (author.nickname) return author.nickname;
  if (author.username) return author.username;
  return 'Unknown Author';
};

const buildDescriptionFromAuthor = (author: User, authorName: string): string => {
  // 1) Prefer the explicit user.description (trimmed and shortened)
  if (author.description) {
    const raw = author.description.trim();
    if (raw.length > 0) {
      const maxLen = 155;
      if (raw.length <= maxLen) return raw;
      return `${raw.slice(0, maxLen - 1).trimEnd()}…`;
    }
  }

  // 2) Then try to use expertise + hometown
  const expertise = author.expertise?.trim();
  const hometown = author.hometown?.trim();

  if (expertise && hometown) {
    return `Discover articles by ${authorName}, a ${expertise.toLowerCase()} based in ${hometown}, sharing insights on water, environment, and sustainable resource management on WaterLyst.`;
  }

  if (expertise) {
    return `Explore content by ${authorName}, a ${expertise.toLowerCase()} contributing practical perspectives on water, hydrology, and sustainable resource management at WaterLyst.`;
  }

  if (hometown) {
    return `Read articles by ${authorName} from ${hometown}, focusing on water, environment, and sustainable solutions on WaterLyst.`;
  }

  // 3) Fallback generic description
  return `Explore articles by ${authorName} on WaterLyst, covering water, hydrology, and sustainable resource management for professionals and enthusiasts.`;
};

export async function generateMetadata({params}: AuthorPageParams): Promise<Metadata> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const authorId = await params.authorId;
  const data: any = await findUserById({id: authorId}, authToken);

  if (!data || !data.users?.findUserById) {
    return {
      title: 'Author Not Found – WaterLyst',
      description: 'The author page you are looking for could not be found on WaterLyst.',
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/author/${authorId}`,
      },
      robots: {
        follow: false,
        index: false,
        googleBot: {follow: false, index: false},
      },
    };
  }

  const author: User = data.users.findUserById;
  const authorName = getAuthorName(author);

  // Build SEO title using expertise if available
  const expertise = author.expertise?.trim();
  const baseTitle = `${authorName} – Author at WaterLyst`;
  const title = expertise ? `${authorName} – ${expertise} | WaterLyst` : baseTitle;

  const description = buildDescriptionFromAuthor(author, authorName);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/author/${authorId}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      follow: true,
      index: true,
      googleBot: {follow: true, index: true},
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'WaterLyst',
      type: 'profile',
      // You can add image from avatar if you like:
      // images: author.avatar?.url ? [{ url: author.avatar.url }] : undefined,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

const Page = async ({params}: AuthorPageParams) => {
  const authorId = await params.authorId;
  const cookieStore = await cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: qk.user(authorId),
    queryFn: () => findUserById({id: authorId}, authToken),
  });

  // Prefetch infinite query to match client useInfiniteQuery
  await queryClient.prefetchInfiniteQuery({
    queryKey: qk.articles(authorId),
    initialPageParam: 1,
    queryFn: ({pageParam}) =>
      searchArticlesByAuthorId({
        authors: [authorId],
        count: 9,
        page: pageParam,
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
        maxWidth: '960px',
        p: {lgDown: 4},
      })}
    >
      <Hydrate state={dehydratedState}>
        <AuthorView />
      </Hydrate>
    </div>
  );
};

export default Page;
