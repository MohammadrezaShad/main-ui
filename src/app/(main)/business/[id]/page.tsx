import {css} from '@styled/css';

import {BusinessView} from '@/components';

const Page = () => (
  <div
    className={css({
      display: 'flex',
      flexDir: 'column',
      rowGap: 8,
      mx: 'auto',
      maxWidth: '1920px',
    })}
  >
    <BusinessView />
  </div>
);

export default Page;
