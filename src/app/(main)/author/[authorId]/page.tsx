import {AuthorView} from '@/components';
import {findUserById} from '@/graphql';
import {searchArticlesByAUthorId} from '@/graphql/query/articles/search-articles-by-author-id';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

const Page = async ({params}: {params: {authorId: string}}) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-user', 1],
    queryFn: () => findUserById({id: params.authorId}),
  });
  await queryClient.prefetchQuery({
    queryKey: ['search-articles', 2],
    queryFn: () => searchArticlesByAUthorId({authors: [params.authorId], count: 9, page: 1}),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className={css({display: 'flex', flexDir: 'column', rowGap: 8})}>
      <Hydrate state={dehydratedState}>
        <AuthorView />
      </Hydrate>
    </div>
  );
};

export default Page;
