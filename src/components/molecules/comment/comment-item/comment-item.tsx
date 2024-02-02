'use client';

import {useObservable, useSelector} from '@legendapp/state/react';
import {css, cx} from '@styled/css';
import Image from 'next/image';
import {PropsWithChildren} from 'react';

import {IconDislike, IconLike, IconReply, userTest} from '@/assets';
import {Button, CommentForm} from '@/components';

import {
  Childs,
  Container,
  Foot,
  Head,
  IconText,
  IconWrap,
  SubTitle,
  Text,
  Title,
} from './comment-item.styled';

interface CommentProps extends PropsWithChildren {
  className?: string;
}

export default function Comment({className, children}: CommentProps) {
  const defaultClassName = css({});
  const commentClass = cx(defaultClassName, className);
  const isShow$ = useObservable(false);
  const isShow = useSelector(() => isShow$.get());
  return (
    <Container className={commentClass}>
      <Head>
        <Image unoptimized src={userTest} alt='user' height={40} width={40} quality={100} />
        <Title>مهسا</Title>
        <SubTitle>25 فروردین 1402 - 11:00 </SubTitle>
      </Head>
      <Text>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
        است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.{' '}
      </Text>
      <Foot>
        <IconWrap>
          <IconText>6</IconText>
          <IconLike
            className={css({
              cursor: 'pointer',

              _hover: {
                '& path': {
                  fill: 'primary',
                },
              },
            })}
          />
        </IconWrap>
        <IconWrap>
          <IconText>0</IconText>
          <IconDislike
            className={css({
              cursor: 'pointer',
              _hover: {
                '& path': {
                  fill: 'danger',
                },
              },
            })}
          />
        </IconWrap>
        <Button
          color='backgroundSecondary'
          className={css({
            color: 'primary',
          })}
          onClick={() => isShow$.set(!isShow)}
        >
          پاسخ
          <IconReply
            className={css({
              mr: 2,
              '& path': {
                fill: 'primary',
              },
            })}
          />
        </Button>
      </Foot>
      {isShow ? <CommentForm className={css({mt: 6})} /> : null}
      {children ? <Childs>{children}</Childs> : null}
    </Container>
  );
}
