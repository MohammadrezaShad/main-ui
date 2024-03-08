import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {NormalQuizView} from '@/components';
import {findQuizById} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const Page = async ({params}: {params: {quizId: string}}) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['find-quiz-by-id', params.quizId],
    queryFn: () => findQuizById({id: params.quizId}),
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
        <NormalQuizView />
      </Hydrate>
    </div>
  );
};

export default Page;
