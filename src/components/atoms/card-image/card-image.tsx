import {css} from '@styled/css';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
}

const CardImage = ({src, alt}: Props) => (
  <Image
    loading='lazy'
    className={css({w: 'full', h: '228px', mb: 6, objectFit: 'cover'})}
    width={304}
    height={228}
    alt={alt}
    src={src}
  />
);

export default CardImage;
