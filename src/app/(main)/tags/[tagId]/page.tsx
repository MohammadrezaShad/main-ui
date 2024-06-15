import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {TagsView} from '@/components';
import {TagStatusEnum} from '@/graphql/generated/types';
import {FindTagBySlug, SearchTags} from '@/graphql/query/tags';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

export const revalidate = 180;

export async function generateStaticParams(): Promise<any> {
  const data = await SearchTags({status: TagStatusEnum.Publish, count: 100});
  if (!data) {
    return {
      title: 'Not found',
      description: 'The page not found',
    };
  }
  const tags = data.results || [];
  return tags.map(tag => ({tagId: tag.slug}));
}

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
