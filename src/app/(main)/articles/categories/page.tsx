import {css} from '@styled/css';

import {CategoriesView} from '@/components';
import {searchCategories, SearchSortType} from '@/graphql';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const data = await searchCategories({count: 50, sortType: SearchSortType.AscendingOrder});

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
      <CategoriesView hasPdf={false} data={data} />
    </div>
  );
};

export default Page;
