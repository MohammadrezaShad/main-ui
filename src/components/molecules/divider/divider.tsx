import {css} from '@styled/css';

const Divider = ({label}: {label: string}) => (
  <div
    className={css({
      position: 'relative',
      my: 6,
    })}
  >
    <div
      className={css({
        w: '1/2',
        h: '1px',
        bgGradient: 'to-l',
        gradientFrom: '#E3E3E3',
        gradientTo: '#E3E3E300',
        position: 'absolute',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
      })}
    />
    <div
      className={css({
        w: '1/2',
        h: '1px',
        bgGradient: 'to-r',
        gradientFrom: '#E3E3E3',
        gradientTo: '#E3E3E300',
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
      })}
    />
    <h2
      className={css({
        px: 8,
        textStyle: {
          base: 'h1',
          mdDown: 'h3',
        },
        whiteSpace: {
          base: 'pre-wrap',
          mdDown: 'nowrap',
        },
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        bg: 'background',
        color: 'text.primary',
      })}
    >
      {label}
    </h2>
  </div>
);

export default Divider;
