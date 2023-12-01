import {Tag} from '@/components';
import {css} from '@styled/css';

const Tags = () => {
  return (
    <ul
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        my: '12',
      })}
    >
      <Tag text='Water' href='' />
      <Tag text='Water crisis' href='' />
    </ul>
  );
};

export default Tags;
