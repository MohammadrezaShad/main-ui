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
    border: '2px solid token(colors.strokeSecondary)',
    rounded: 'md',
    position: 'absolute',
    zIndex: '-1',
    cursor: 'pointer',
    h: '100%',
    w: '100%',
    transition: 'all 0.3s',
    _before: {
      content: "''",
      position: 'absolute',
      left: '7px',
      top: '4px',
      width: '5px',
      height: '10px',
      border: 'solid white',
      borderWidth: '0 2px 2px 0',
      transform: 'rotate(45deg)',
    },
    _peerChecked: {
      bg: 'primary',
      borderColor: 'primary',
      _after: {display: 'block'},
    },
  },
});

typeof Checkmark;
