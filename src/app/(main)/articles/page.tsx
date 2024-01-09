import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {ArticlesView} from '@/components';
import {StatusType} from '@/graphql/generated/types';
import {searchArticles} from '@/graphql/query/search-articles';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['search-articles', 18],
    queryFn: () => searchArticles({status: StatusType.Publish, count: 18, page: 1}),
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
        <ArticlesView />
      </Hydrate>
    </div>
  );
};

export default Page;
