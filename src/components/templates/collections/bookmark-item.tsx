import {ArticleType} from '@/graphql';
import {css} from '@styled/css';
import moment from 'moment';
import Image from 'next/image';
import {Button, Container, Content, Date, TitleLink, Wrapper} from './bookmark-item.styled';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const BookmarkItem = ({
  article,
  onRemoveBookmark,
}: {
  article: ArticleType;
  onRemoveBookmark: (id: string) => void;
}) => (
  <Container>
    <Wrapper>
      {article.thumbnail?._id ? (
        <Image
          className={css({
            aspectRatio: 'square',
            objectFit: 'cover',
            objectPosition: 'center',
            w: '32',
            h: '32',
            overflow: 'hidden',
            flexShrink: '0',
          })}
          unoptimized
          width={128}
          height={128}
          alt=''
          src={`${IMAGE_STORAGE_URL}/${article.thumbnail?._id}`}
        />
      ) : (
        <div
          className={css({
            w: '32',
            h: '32',
            backgroundColor: 'gray3',
            aspectRatio: 'square',
            flexShrink: '0',
          })}
        />
      )}
      <Content>
        <Date>{moment(article.publishDate).format('DD MMMM YYYY')}</Date>
        <TitleLink href={`/articles/${article.slug}`}>{article.title}</TitleLink>
        <Button onClick={() => onRemoveBookmark(article._id)} type='button'>
          Remove
        </Button>
      </Content>
    </Wrapper>
  </Container>
);

export default BookmarkItem;
