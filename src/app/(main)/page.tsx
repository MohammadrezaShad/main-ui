import {dehydrate} from '@tanstack/react-query';

import {MainHome} from '@/components';
import {StatusType, searchArticles, searchCategories} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

import {unstable_noStore as noStore} from 'next/cache';

export default async function Home() {
  noStore();
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['search-articles-home'],
    queryFn: () => searchArticles({status: StatusType.Publish, count: 15, page: 1}),
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
