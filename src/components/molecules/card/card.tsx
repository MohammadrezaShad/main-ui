import {CardDate} from '@/components/atoms/card-date';
import {CardImage} from '@/components/atoms/card-image';
import {CardLink} from '@/components/atoms/card-link';
import {CardTitle} from '@/components/atoms/card-title';
import {formatDate} from '@/utils/format-date';
import {css} from '@styled/css';
import {Container, Wrap} from './card.styled';
import { grid } from '@styled/patterns';

interface Props {
    imageUrl?: string;
    date?: string;
    title: string;
    articleLink: string;
}

export default function Card({imageUrl, date, title, articleLink}: Props) {
  return (
    <Container>
      {imageUrl ? <CardImage src={imageUrl} alt={title} /> : <div className={grid({
        placeContent: 'center',
        w: 'full',
        h: 228,
        bgColor: 'gray3',
        mb: "6"

      })}></div>}
      <Wrap
        className={css({
          mb: 4,
        })}
      >
        {date && <CardDate dateTime={formatDate(date)}>{date}</CardDate>}
        <CardTitle>{title}</CardTitle>
      </Wrap>
      <Wrap
        className={css({
          mb: 6,
        })}
      >
        <CardLink href={articleLink}>READ MORE</CardLink>
      </Wrap>
    </Container>
  );
}
