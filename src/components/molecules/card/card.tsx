import {css} from '@styled/css';
import {grid} from '@styled/patterns';

import {IconBook} from '@/assets';
import {CardDate} from '@/components/atoms/card-date';
import {CardImage} from '@/components/atoms/card-image';
import {CardLink} from '@/components/atoms/card-link';
import {CardTitle} from '@/components/atoms/card-title';

import {Container, Wrap} from './card.styled';

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
        <CardImage src={imageUrl} alt={title} />
      ) : (
        <div
          className={grid({
            placeContent: 'center',
            w: 'full',
            h: 228,
            bgColor: 'gray3',
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
      <Wrap>
        {date && <CardDate dateTime={date}>{date}</CardDate>}
        <CardTitle>{title}</CardTitle>
        <CardLink href={articleLink}>{linkTitle}</CardLink>
      </Wrap>
    </Container>
  );
}
