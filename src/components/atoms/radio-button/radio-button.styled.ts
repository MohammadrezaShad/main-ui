import {styled} from '@styled/jsx';

export const Input = styled('input', {
  base: {position: 'absolute', opacity: 0, cursor: 'pointer', h: '100%', w: '100%'},
});

export const Container = styled('span', {
  base: {
    display: 'block',
    position: 'relative',
    zIndex: 1,
    cursor: 'pointer',
    userSelect: 'none',
    flexShrink: 0,
    h: 6,
    w: 6,
  },
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'default',
        pointerEvents: 'none',
      },
    },
  },
});

export const Checkmark = styled('span', {
  base: {
    display: 'inline-block',
    rounded: '50%',
    position: 'absolute',
    zIndex: '-1',
    cursor: 'pointer',
    h: '100%',
    w: '100%',
    bg: 'gray3',
    transition: 'all 0.3s',
    _before: {
      content: "''",
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '6px',
      height: '6px',
      rounded: '50%',
      transform: 'translate(-50%, -50%)',
    },
    _peerChecked: {
      bg: 'primary',
      _before: {display: 'block', backgroundColor: 'white'},
    },
  },
});
