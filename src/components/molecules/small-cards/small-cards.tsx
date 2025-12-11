import {css} from '@styled/css';
import {flex, grid} from '@styled/patterns';
import Image from 'next/image';

import {IconBook} from '@/assets';
import {CardDate} from '@/components/atoms/card-date';
import {CardLink} from '@/components/atoms/card-link';
import {CardTitle} from '@/components/atoms/card-title';

import {Container, Wrap} from './small-card.styled';

interface Props {
  imageUrl?: string;
  date?: string;
  title: string;
  articleLink: string;
  linkTitle?: string;
}

export default function Card({imageUrl, date, title, articleLink, linkTitle = 'READ MORE'}: Props) {
  return (
    <Container>
      {imageUrl ? (
        <Image
          unoptimized
          width={112}
          height={112}
          src={imageUrl}
          alt={title}
          className={css({
            objectFit: 'cover',
            w: '[112px]',
            aspectRatio: '1',
          })}
        />
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
        >
          <IconBook
            className={css({
              w: '16',
              h: '16',
              fill: 'gray.500',
            })}
          />
        </div>
      )}
      <div
        className={flex({
          flexDirection: 'column',
        })}
      >
        <Wrap className={css({pt: 1})}>
          {date && <CardDate dateTime={date}>{date}</CardDate>}
          <CardTitle className={css({mt: !date ? 1 : undefined})}>{title}</CardTitle>
        </Wrap>
        <Wrap className={css({})}>
          <CardLink href={articleLink}>{linkTitle}</CardLink>
        </Wrap>
      </div>
    </Container>
  );
}
