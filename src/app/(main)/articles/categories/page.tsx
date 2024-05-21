import {css} from '@styled/css';
import {dehydrate} from '@tanstack/react-query';

import {CategoriesView} from '@/components';
import {searchCategories} from '@/graphql';
import {getQueryClient} from '@/helpers';
import {Hydrate} from '@/providers';

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-categories'],
    queryFn: () => searchCategories({count: 50}),
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
        <CategoriesView hasPdf={false} />
      </Hydrate>
    </div>
  );
};

export default Page;
