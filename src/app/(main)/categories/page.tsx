import {CategoriesView} from '@/components';
import {css} from '@styled/css';

const Page = () => {
  return (
    <div className={css({display: 'flex', flexDir: 'column', rowGap: 8})}>
      <CategoriesView />
    </div>
  );
};

export default Page;
