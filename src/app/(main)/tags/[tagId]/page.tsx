import {TagsView} from '@/components';
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {FindTagBySlug} from '@/graphql/query/tags';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const Page = async ({params}: {params: {tagId: string}}) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['find-tag', params.tagId],
    queryFn: () => FindTagBySlug({slug: params.tagId}),
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
        <TagsView />
      </Hydrate>
    </div>
  );
};

export default Page;
