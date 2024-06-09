import {css} from '@styled/css';
import {grid} from '@styled/patterns';
import Image from 'next/image';

import ProfileCircle from '@/assets/images/profile-circle.png';

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
        placeContent: 'center',
        aspectRatio: 'square',
        flexShrink: 0,
      })}
    >
      <Image
        unoptimized
        width={size}
        height={size}
        alt={alt}
        src={ProfileCircle}
        className={css({rounded: 'full', width: `${size}px`, height: `${size}px`})}
      />
    </div>
  );
};

export default Avatar;
