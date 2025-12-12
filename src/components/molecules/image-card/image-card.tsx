import {css, cx} from '@styled/css';
import Image from 'next/image';
import Link from 'next/link';

import {CardDate} from '@/components/atoms/card-date';
import {CardTitle} from '@/components/atoms/card-title';
import {formatDate} from '@/utils/format-date';

import {Container, Footer} from './image-card.styled';

interface Props {
  aspectRatio?: 'square' | 'portrait';
  imageUrl?: string;
  date: string;
  title: string;
  articleLink: string;
  className?: string;
}

const ImageCard = ({
  imageUrl,
  date,
  title,
  aspectRatio = 'square',
  articleLink,
  className,
}: Props) => (
  <div className={css({rounded: '8px'})}>
    <Container
      className={cx(css({hideBelow: 'md'}), className)}
      style={{backgroundImage: `url(${imageUrl})`}}
      _aspectRatio={aspectRatio}
    >
      <Footer>
        <CardDate className={css({color: 'gray3 !important'})} dateTime={formatDate(date)}>
          {formatDate(date)}
        </CardDate>
        <Link href={articleLink}>
          <CardTitle
            className={css({
              color: 'text.invert !important',
            })}
          >
            {title}
          </CardTitle>
        </Link>
      </Footer>
    </Container>

    <Container className={css({hideFrom: 'md'})}>
      {imageUrl ? (
        <Image
          unoptimized
          width='112'
          height='112'
          alt={title}
          src={imageUrl}
          className={css({
            objectFit: 'cover',
            objectPosition: 'center',
            aspectRatio: 'square',
            flexShrink: '0',
            rounded: '8px',
          })}
        />
      ) : (
        <div
          className={css({
            width: '112px',
            height: '112px',
            backgroundColor: 'gray3',
            aspectRatio: 'square',
            flexShrink: '0',
          })}
        />
      )}
      <Footer>
        <CardDate
          className={css({color: {base: 'gray3 !important', mdDown: 'gray4 !important'}, mb: 1})}
          dateTime={formatDate(date)}
        >
          {formatDate(date)}
        </CardDate>
        <Link href={articleLink}>
          <CardTitle
            className={css({
              color: {base: 'text.invert !important', mdDown: 'text.primary !important'},
            })}
          >
            {title}
          </CardTitle>
        </Link>
        <Link className={css({hideFrom: 'md', color: 'primary'})} href={articleLink}>
          READ MORE
        </Link>
      </Footer>
    </Container>
  </div>
);

export default ImageCard;
