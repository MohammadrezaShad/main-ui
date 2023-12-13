import {css} from '@styled/css';
import {flex, grid} from '@styled/patterns';
import Image from 'next/image';

import {CardDate} from '@/components/atoms/card-date';
import {CardLink} from '@/components/atoms/card-link';
import {CardTitle} from '@/components/atoms/card-title';
import {formatDate} from '@/utils/format-date';

import {Container, Wrap} from './small-card.styled';

interface Props {
  imageUrl?: string;
  date?: string;
  title: string;
  articleLink: string;
}

export default function Card({imageUrl, date, title, articleLink}: Props) {
  let formattedDate: string = '';
  if (date) {
    formattedDate = new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return (
    <Container>
      {imageUrl ? (
        <Image width={112} height={112} src={imageUrl} alt={title} />
      ) : (
        <div
          className={grid({
            placeContent: 'center',
            w: '112px',
            h: '112px',
            bgColor: 'gray3',
            flexShrink: '0',
            aspectRatio: 'square',
          })}
        />
      )}
      <div
        className={flex({
          flexDirection: 'column',
        })}
      >
        <Wrap className={css({})}>
          {date && <CardDate dateTime={formatDate(date)}>{formattedDate}</CardDate>}
          <CardTitle>{title}</CardTitle>
        </Wrap>
        <Wrap className={css({})}>
          <CardLink href={articleLink}>READ MORE</CardLink>
        </Wrap>
      </div>
    </Container>
  );
}
