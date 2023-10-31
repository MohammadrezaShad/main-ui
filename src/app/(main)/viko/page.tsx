import {css} from '@styled/css';

import {Viko as VikoView} from '@/components';

export default async function Viko() {
  return (
    <div
      className={css({
        bg: 'background',
        p: {base: 8, lgDown: 6},
        rounded: '2xl',
      })}
    >
      <VikoView />
    </div>
  );
}
