import {dehydrate} from '@tanstack/react-query';

import {Home as HomeView} from '@/components';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {gqlFetch} from '@/services';

async function getData() {
  const res = await gqlFetch(
    process.env.NEXT_PUBLIC_API as string,
    `query SearchCachedTrendLinks {
        trendLinks {
          searchCachedTrendLinks {
            error
            results {
              _id
              link
              title
            }
            status
            success
            totalCount
            totalPages
          }
        }
  }`,
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({queryKey: ['test-data'], queryFn: getData});
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <HomeView />
    </Hydrate>
  );
}
