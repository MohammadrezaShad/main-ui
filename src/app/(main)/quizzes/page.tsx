import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {QuizzesView} from '@/components';
import {getBestUsers, getTopQuizzes, getTotalCount, getTotalGraphicalCount} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-normal-quiz-count'],
    queryFn: () => getTotalCount(),
  });
  await queryClient.prefetchQuery({
    queryKey: ['get-graphical-quiz-count'],
    queryFn: () => getTotalGraphicalCount(),
  });
  await queryClient.prefetchQuery({
    queryKey: ['get-top-quizzes'],
    queryFn: () => getTopQuizzes(),
  });
  await queryClient.prefetchQuery({
    queryKey: ['get-best-user', 8],
    queryFn: () => getBestUsers({count: 8}),
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
        <QuizzesView />
      </Hydrate>
    </div>
  );
};

export default Page;
