import {css} from '@styled/css';

import {CategoriesView} from '@/components';
import {searchCategories} from '@/graphql';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const data = await searchCategories({count: 50});

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
      <CategoriesView hasPdf data={data} />
    </div>
  );
};

export default Page;
