import {CategoriesView} from '@/components';
import {searchCategories} from '@/graphql/query/categories';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';
import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-categories'],
    queryFn: () => searchCategories({count: 50}),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={css({display: 'flex', flexDir: 'column', rowGap: 8})}>
      <Hydrate state={dehydratedState}>
        <CategoriesView />
      </Hydrate>
    </div>
  );
};

export default Page;
