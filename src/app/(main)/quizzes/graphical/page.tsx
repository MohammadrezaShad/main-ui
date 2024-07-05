import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {cookies} from 'next/headers';

import {GraphicalQuizzesView} from '@/components';
import {CookieName} from '@/constants';
import {searchGraphicalQuizzes} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const Page = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['search-graphical-quizzes'],
    queryFn: () => searchGraphicalQuizzes({count: 12, page: 1}, authToken),
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
        <GraphicalQuizzesView />
      </Hydrate>
    </div>
  );
};

export default Page;
