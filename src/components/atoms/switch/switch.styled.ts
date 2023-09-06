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
    h: 6,
    w: 12,
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
    border: '2px solid',
    borderColor: 'stroke',
    rounded: 'xl',
    position: 'absolute',
    zIndex: '-1',
    cursor: 'pointer',
    h: '100%',
    w: '100%',
    transition: 'all 0.3s',
    _before: {
      content: "''",
      position: 'absolute',
      left: '2px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '16px',
      height: '16px',
      rounded: '50%',
      background: 'stroke',
      transition: 'all 0.3s',
      right: 'auto',
    },
    _peerChecked: {
      bg: 'secondary',
      borderColor: 'secondary',
      _before: {background: 'white', left: '26px'},
    },
  },
});

typeof Checkmark;
