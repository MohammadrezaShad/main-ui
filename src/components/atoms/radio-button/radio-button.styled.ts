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
    border: '2px solid',
    borderColor: 'stroke',
    rounded: '50%',
    position: 'absolute',
    zIndex: '-1',
    cursor: 'pointer',
    h: '100%',
    w: '100%',
    transition: 'all 0.3s',
    _before: {
      content: "''",
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '8px',
      height: '8px',
      rounded: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'surface',
    },
    _peerChecked: {
      bg: 'secondary',
      borderColor: 'secondary',
      _before: {display: 'block'},
    },
  },
});
