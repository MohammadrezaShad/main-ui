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
        p: {lgDown: 0},
      })}
    >
      <CategoriesView hasPdf data={data} />
    </div>
  );
};

export default Page;
