import {dehydrate} from '@tanstack/react-query';
import {Metadata} from 'next';
import {unstable_noStore as noStore} from 'next/cache';

import {MainHome} from '@/components';
import {
  ArticleSortType,
  searchArticles,
  searchCategories,
  searchHomepages,
  SearchSeoHomepageOutput,
  StatusType,
} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['search-home-seo'],
    queryFn: () => searchHomepages({}),
  });
  const data = (await queryClient.getQueryData(['search-home-seo'])) as SearchSeoHomepageOutput;
  const title = data?.results?.[0]?.metaTitle || 'Waterlyst';

  return {
    metadataBase: new URL(BASE_URL || 'http://localhost:3000'),
    title,
    description: data?.results?.[0]?.metaDescription || 'Save the world',
  };
}

export default async function Home() {
  noStore();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['recent-articles', 1],
    queryFn: () => searchArticles({status: StatusType.Publish, count: 3}),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['showcase-articles'],
    queryFn: () =>
      searchArticles({
        status: StatusType.Publish,
        count: 12,
        page: 1,
        isShowcase: true,
        sortType: ArticleSortType.AscendingOrder,
      }),
    initialPageParam: 1,
  });
  await queryClient.prefetchQuery({
    queryKey: ['search-categories-home'],
    queryFn: () => searchCategories({}),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MainHome />
    </Hydrate>
  );
}
