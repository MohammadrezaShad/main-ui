'use client';

import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';
import {hasCookie} from 'cookies-next';

import {IconSearch} from '@/assets';
import {AuthButton, Avatar, HeaderNavbar, Login, Logo, SearchDrawer, SignUp} from '@/components';

import Link from 'next/link';
import UserHeaderInfo from '../user-info/user-info';
import {Container, Wrap} from './header.styled';

interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const isOpen$ = useObservable(false);
  const isLoginOpen$ = useObservable(false);
  const isSignUpOpen$ = useObservable(false);
  const authToken = hasCookie('authToken');

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
        {authToken ? (
          <Link className={css({hideFrom: 'md'})} href='/profile'>
            <Avatar size={32} />
          </Link>
        ) : null}
        <SearchDrawer isOpen$={isOpen$} />
        <Login isSignUpOpen$={isSignUpOpen$} isOpen$={isLoginOpen$} />
        <SignUp isOpen$={isSignUpOpen$} isLoginOpen$={isLoginOpen$} />
      </Wrap>
    </Container>
  );
}
