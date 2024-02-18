'use client';

import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';
import {useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import Link from 'next/link';

import {IconSearch} from '@/assets';
import {AuthButton, Avatar, HeaderNavbar, Login, Logo, SearchDrawer, SignUp} from '@/components';
import {CookieName} from '@/constants';
import {useAuthContext} from '@/contexts';
import {getUser} from '@/graphql';

import UserHeaderInfo from '../user-info/user-info';
import {Container, Wrap} from './header.styled';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL;

interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const {isLoginOpen$, isSignUpOpen$} = useAuthContext();
  const isOpen$ = useObservable(false);
  const isClient$ = useObservable(false);
  const authToken = getCookie(CookieName.AUTH_TOKEN)!;
  const {data} = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => getUser(authToken),
  });
  const user = data;

  return (
    <Container>
      <Wrap>
        <Logo />
      </Wrap>
      <Wrap>
        <HeaderNavbar />
        <IconSearch
          className={css({cursor: 'pointer', mx: {base: 12, mdDown: 4}})}
          onClick={() => isOpen$.set(true)}
        />
        {authToken ? (
          <UserHeaderInfo />
        ) : (
          <>
            <AuthButton
              onClick={() => isLoginOpen$.set(true)}
              variant='outlined'
              className={css({
                '& span': {color: 'gray4'},
                w: 'max-content',
                px: 4,
                py: 3,
                hideBelow: 'md',
                mr: 4,
                border: '1px solid token(colors.gray3)',
              })}
            />
            <AuthButton
              onClick={() => isSignUpOpen$.set(true)}
              text='Sign Up'
              className={css({
                '& span': {color: 'text.invert'},
                w: 'max-content',
                px: 4,
                py: 3,
                hideBelow: 'md',
                bg: 'primary',
              })}
            />
          </>
        )}
        {user && authToken ? (
          <Link className={css({hideFrom: 'md'})} href='/profile'>
            <Avatar
              src={user?.avatar?._id ? `${IMAGE_STORAGE_URL}/${user.avatar?._id}` : undefined}
              size={32}
            />
          </Link>
        ) : (
          <button
            type='button'
            className={css({hideFrom: 'md'})}
            onClick={() => isLoginOpen$.set(true)}
          >
            <Avatar size={32} />
          </button>
        )}
        <SearchDrawer isOpen$={isOpen$} />
        <Login isSignUpOpen$={isSignUpOpen$} isOpen$={isLoginOpen$} />
        <SignUp isOpen$={isSignUpOpen$} isLoginOpen$={isLoginOpen$} />
      </Wrap>
    </Container>
  );
}
