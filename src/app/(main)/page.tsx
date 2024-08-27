import {dehydrate} from '@tanstack/react-query';
import {unstable_noStore as noStore} from 'next/cache';

import {MainHome} from '@/components';
import {ArticleSortType, searchArticles, searchCategories, StatusType} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

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
