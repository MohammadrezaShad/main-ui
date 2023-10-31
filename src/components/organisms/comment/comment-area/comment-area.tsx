'use client';

import {css, cx} from '@styled/css';

import {IconChevronDown, IconComment} from '@/assets';
import {CommentForm, CommentList} from '@/components';

import {Box, Container, ShowMore, SubTitle, Title} from './comment-area.styled';

interface CommentAreaProps {
  className?: string;
}

export default function CommentArea({className}: CommentAreaProps) {
  const defaultClassName = css({});
  const commentAreaClass = cx(defaultClassName, className);

  return (
    <Container className={commentAreaClass}>
      <Box>
        <IconComment />
        <Title>دیدگاه کاربران &nbsp;• &nbsp;</Title>
        <SubTitle>25 دیدگاه</SubTitle>
      </Box>
      <CommentForm className={css({mb: 6})} />
      <CommentList />
      <ShowMore>
        نمایش بیشتر
        <IconChevronDown className={css({mr: 2})} />
      </ShowMore>
    </Container>
  );
}
