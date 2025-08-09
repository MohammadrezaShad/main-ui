import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';
import {cookies} from 'next/headers';

import {GraphicalQuizView} from '@/components';
import {CookieName} from '@/constants';
import {findGraphicalQuizById} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const Page = async ({params: initalParams}: {params: {quizId: string}}) => {
  const params = await initalParams;
  const cookieStore = await cookies();
  const authToken = cookieStore.get(CookieName.AUTH_TOKEN)?.value || '';
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['find-graphical-quiz-by-id', params.quizId],
    queryFn: () => findGraphicalQuizById({id: params.quizId}, authToken),
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
        p: {lgDown: 0},
      })}
    >
      <Hydrate state={dehydratedState}>
        <GraphicalQuizView />
      </Hydrate>
    </div>
  );
};

export default Page;
