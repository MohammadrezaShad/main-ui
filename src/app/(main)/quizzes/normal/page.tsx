import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {unstable_noStore as noStore} from 'next/cache';

import {NormalQuizzesView} from '@/components';
import {searchQuizzes} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const Page = async () => {
  noStore();
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['search-quizzes'],
    queryFn: () => searchQuizzes({count: 12, page: 1}),
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        rowGap: 8,
        mx: 'auto',
        maxWidth: 'full',
        p: {lgDown: 4},
      })}
    >
      <Hydrate state={dehydratedState}>
        <NormalQuizzesView />
      </Hydrate>
    </div>
  );
};

export default Page;
