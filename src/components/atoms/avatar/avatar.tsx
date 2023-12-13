import {css} from '@styled/css';
import {grid} from '@styled/patterns';
import Image from 'next/image';

import {IconUser} from '@/assets';

interface Props {
  src?: string;
  size?: number;
  alt?: string;
}

const Avatar = ({src, size = 64, alt = ''}: Props) => {
  if (src) {
    return (
      <Image
        width={size}
        height={size}
        alt={alt}
        src={src}
        className={css({rounded: 'full', width: `${size}px`, height: `${size}px`})}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={grid({
        rounded: 'full',
        backgroundColor: 'gray1',
        border: '1px solid token(colors.gray3)',
        placeContent: 'center',
        aspectRatio: 'square',
      })}
    >
      <IconUser />
    </div>
  );
};

export default Avatar;
