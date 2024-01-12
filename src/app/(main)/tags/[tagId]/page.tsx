import {TagsView} from '@/components';
import {css} from '@styled/css';

const Page = async ({params}: {params: {tagId: string}}) => (
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
    <TagsView />
  </div>
);

export default Page;
