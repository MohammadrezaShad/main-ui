import {css} from '@styled/css';

const Divider = ({label}: {label: string}) => {
  return (
    <div
      className={css({
        position: 'relative',
        my: 6,
      })}
    >
      <div
        className={css({
          w: 'full',
          h: '1px',
          borderTop: '1px solid token(colors.gray3)',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        })}
      />
      <h1
        className={css({
          px: 8,
          textStyle: 'h1',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          bg: 'background',
          color: 'text.primary',
        })}
      >
        {label}
      </h1>
    </div>
  );
};

export default Divider;
