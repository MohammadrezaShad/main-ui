import {MainHome} from '@/components';
import {searchCategories} from '@/graphql/query/categories';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {dehydrate} from '@tanstack/react-query';

export default async function Home() {
  const queryClient = getQueryClient();
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
