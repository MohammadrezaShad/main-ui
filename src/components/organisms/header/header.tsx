'use client';

import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';
import {useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import Link from 'next/link';

import {IconSearch} from '@/assets';
import {Avatar, Button, HeaderNavbar, Login, Logo, SearchDrawer, SignUp} from '@/components';
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
            <Button
              onClick={() => isLoginOpen$.set(true)}
              className={css({
                color: {
                  base: 'gray4',
                  _hover: 'white',
                },
                w: 'max-content',
                px: 4,
                py: 3,
                hideBelow: 'md',
                mr: 4,
                border: '1px solid token(colors.gray3)',
                borderRadius: 0,
              })}
              visual='outlined'
            >
              Login
            </Button>
            <Button
              onClick={() => isSignUpOpen$.set(true)}
              className={css({
                w: 'max-content',
                px: 4,
                py: 3,
                hideBelow: 'md',
                bg: 'primary',
                borderRadius: 0,
              })}
            >
              Sign Up
            </Button>
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
