import {ArticlesView} from '@/components';
import {searchArticles} from '@/graphql/query/search-articles';
import {getQueryClient} from '@/helpers';
import {css} from '@styled/css';

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['search-articles'],
    queryFn: () => searchArticles({count: 12, page: 1}),
  });
  return (
    <div className={css({display: 'flex', flexDir: 'column', rowGap: 8})}>
      <ArticlesView />
    </div>
  );
};

export default Page;
