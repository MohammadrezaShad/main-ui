import {css} from '@styled/css';
import {grid} from '@styled/patterns';
import Image from 'next/image';

import ProfileCircle from '@/assets/vectors/icon-user.svg';

interface Props {
  src?: string;
  size?: number;
  alt?: string;
}

const Avatar = ({src, size = 64, alt = ''}: Props) => {
  if (src) {
    return (
      <Image
        unoptimized
        width={size}
        height={size}
        alt={alt}
        src={src}
        className={css({
          rounded: 'full',
          flexShrink: '0',
          objectFit: 'cover',
          width: `${size}px`,
          height: `${size}px`,
        })}
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
        placeContent: 'center',
        aspectRatio: 'square',
        flexShrink: 0,
        border: '1px solid token(colors.gray3)',
        bg: 'gray1',
      })}
    >
      <ProfileCircle
        className={css({
          rounded: 'full',
          width: `${size}px`,
          height: `${size}px`,
          '& path': {
            fill: 'gray6',
          },
        })}
      />
    </div>
  );
};

export default Avatar;
