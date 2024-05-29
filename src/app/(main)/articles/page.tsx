import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {ArticlesView} from '@/components';
import {StatusType, searchArticles} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

import {unstable_noStore as noStore} from 'next/cache';

export const dynamic = 'force-dynamic';

const Page = async () => {
  noStore();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['top-three-articles'],
    queryFn: () => searchArticles({status: StatusType.Publish, count: 6, hasPdf: false}),
  });
  await queryClient.prefetchQuery({
    queryKey: ['search-articles', 1],
    queryFn: () => searchArticles({status: StatusType.Publish, count: 18, page: 1, hasPdf: false}),
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
        <ArticlesView hasPdf={false} />
      </Hydrate>
    </div>
  );
};

export default Page;
