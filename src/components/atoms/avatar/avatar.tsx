import React from 'react';
import {css} from '@styled/css';
import {grid} from '@styled/patterns';
import Image from 'next/image';

import {IconUser} from '@/assets';

interface Props {
  src?: string;
  size?: number;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image> & Props
>(({src, size = 64, alt = ''}, ref) => {
  if (src && src.length > 0) {
    return (
      <Image
        ref={ref}
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
          aspectRatio: 'square',
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
      <IconUser
        style={{
          width: `${Math.floor(size * (2 / 3))}px`,
          height: `${Math.floor(size * (2 / 3))}px`,
        }}
        className={css({
          rounded: 'full',
          w: `${Math.floor(size * (2 / 3))}px`,
          h: `${Math.floor(size * (2 / 3))}px`,
          '& path': {
            fill: 'gray6',
          },
        })}
      />
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
