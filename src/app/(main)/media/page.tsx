import {css} from '@styled/css';

import {Media as MediaView} from '@/components';

export default async function Media() {
  return (
    <div
      className={css({
        bg: 'background',
        p: {base: 8, lgDown: 6},
        rounded: '2xl',
      })}
    >
      <MediaView />
    </div>
  );
}
