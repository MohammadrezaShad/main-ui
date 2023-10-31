'use client';

import {css, cx} from '@styled/css';
import Image from 'next/image';

import {IconSend, userTest} from '@/assets';

import {Box, Container, IconWrap, Input} from './comment-form.styled';

interface CommentFormProps {
  className?: string;
}

export default function CommentForm({className}: CommentFormProps) {
  const defaultClassName = css({});
  const commentFormClass = cx(defaultClassName, className);

  return (
    <Container className={commentFormClass}>
      <Box>
        <Image
          src={userTest}
          alt='user'
          height={32}
          width={32}
          quality={100}
          className={css({
            rounded: '50%',
            overflow: 'hidden',
            pos: 'absolute',
            top: '16px',
            right: 4,
          })}
        />
        <Input contentEditable />
      </Box>
      <IconWrap>
        <IconSend />
      </IconWrap>
    </Container>
  );
}
