import {css, cx} from '@styled/css';

const Tab = ({
  name,
  isSelected,
  onSelect,
}: {
  name: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
}) => (
  <button
    type='button'
    className={cx(
      css({
        px: '4',
        py: '3',
        flexShrink: '0',
        cursor: 'pointer',
        transitionDuration: '200',
        transitionTimingFunction: 'in.out',
        transform:
          'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
      }),
      isSelected
        ? css({color: 'white', bgColor: 'sky.400'})
        : css({borderWidth: '1px', borderStyle: 'solid', borderColor: 'gray.300'}),
    )}
    onClick={() => onSelect(name)}
  >
    {name}
  </button>
);

export default Tab;
