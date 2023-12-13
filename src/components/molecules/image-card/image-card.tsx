import {css} from '@styled/css';
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
}

const ImageCard = ({imageUrl, date, title, aspectRatio = 'square', articleLink}: Props) => (
  <>
    <Container
      className={css({hideBelow: 'md'})}
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
          width='112'
          height='112'
          alt={title}
          src={imageUrl}
          className={css({
            objectFit: 'cover',
            objectPosition: 'center',
            aspectRatio: 'square',
            flexShrink: '0',
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
          className={css({color: {base: 'gray3 !important', mdDown: 'gray4 !important'}})}
          dateTime={formatDate(date)}
        >
          {date}
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
  </>
);

export default ImageCard;
