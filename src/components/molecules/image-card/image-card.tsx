import React from 'react';
import {Container, Footer} from './image-card.styled';
import {css} from '@styled/css';
import {CardDate} from '@/components/atoms/card-date';
import {formatDate} from '@/utils/format-date';
import {CardTitle} from '@/components/atoms/card-title';
import Link from 'next/link';

interface Props {
  aspectRatio?: 'square' | 'portrait';
  imageUrl: string;
  date: string;
  title: string;
  articleLink: string;
}

const ImageCard = ({imageUrl, date, title, aspectRatio = 'square', articleLink}: Props) => {
  return (
    <Container style={{backgroundImage: `url(${imageUrl})`}} _aspectRatio={aspectRatio}>
      <Footer>
        <CardDate className={css({color: 'gray3 !important'})} dateTime={formatDate(date)}>
          {date}
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
  );
};

export default ImageCard;
