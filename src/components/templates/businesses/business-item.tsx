import {css} from '@styled/css';
import Image from 'next/image';

import {CompanyType} from '@/graphql';

import {Button, Container, Content, Date, TitleLink, Wrapper} from './business-item.styled';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

const BusinessItem = ({
  article,
  onRemoveBookmark,
}: {
  article: CompanyType;
  onRemoveBookmark: (id: string) => void;
}) => (
  <Container>
    <Wrapper>
      {article.cover?._id ? (
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
          src={`${IMAGE_STORAGE_URL}/${article.cover?.filename}-${article.cover?._id}`}
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
        <Date>{article.about}</Date>
        <TitleLink href={`/profile/businesses/${article._id}`}>{article.title}</TitleLink>
        <Button onClick={() => onRemoveBookmark(article._id)} type='button'>
          Remove
        </Button>
      </Content>
    </Wrapper>
  </Container>
);

export default BusinessItem;
