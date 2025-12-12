'use client';

import {Suspense, useEffect} from 'react';
import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';
import {useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

import {IconSearch} from '@/assets';
import {
  Avatar,
  Button,
  HeaderNavbar,
  Login,
  Logo,
  SearchDrawer,
  SignUp,
  UserHeaderInfo,
} from '@/components';
import {CookieName} from '@/constants';
import {useAuthContext} from '@/contexts';
import {getUser} from '@/graphql';

import {Container, Wrap} from './header.styled';

const IMAGE_STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

export default function Header() {
  const {isLoginOpen$, isSignUpOpen$} = useAuthContext();
  const isOpen$ = useObservable(false);
  const token = getCookie(CookieName.AUTH_TOKEN);
  const {data: user} = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(token as string),
  });
  const router = useRouter();

  useEffect(() => {
    if (user) {
      try {
        const redirect = sessionStorage.getItem('postLoginRedirect');
        if (redirect) {
          sessionStorage.removeItem('postLoginRedirect');
          router.push(redirect);
        }
      } catch {
        // e
      }
    }
  }, [user, router]);

  return (
    <Suspense fallback={<div />}>
      <Container style={{position: 'sticky', transition: 'all 0.3s'}} id='main-nav-header'>
        <Wrap>
          <Logo />
        </Wrap>
        <Wrap>
          <HeaderNavbar />
          <IconSearch
            className={css({cursor: 'pointer', mx: {base: 12, mdDown: 4}})}
            onClick={() => isOpen$.set(true)}
          />
          {user && token ? (
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
                  border: '1px solid token(colors.gray3) !important',
                  borderRadius: '8px',
                })}
                visual='outlined'
              >
                Log In
              </Button>
              <Button
                onClick={() => isSignUpOpen$.set(true)}
                className={css({
                  w: 'max-content',
                  px: 4,
                  py: 3,
                  hideBelow: 'md',
                  bg: 'primary',
                  borderRadius: '8px',
                })}
              >
                Sign Up
              </Button>
            </>
          )}
          {user ? (
            <Link className={css({hideFrom: 'md'})} href='/profile'>
              <Avatar
                src={user?.avatar?._id ? `${IMAGE_STORAGE_URL}/${user.avatar?._id}` : ''}
                alt=''
                size={32}
              />
            </Link>
          ) : (
            <button
              type='button'
              className={css({hideFrom: 'md'})}
              onClick={() => isLoginOpen$.set(true)}
            >
              <Avatar size={32} src='' alt='' />
            </button>
          )}
          <SearchDrawer isOpen$={isOpen$} />
          <Login isSignUpOpen$={isSignUpOpen$} isOpen$={isLoginOpen$} />
          <SignUp isOpen$={isSignUpOpen$} isLoginOpen$={isLoginOpen$} />
        </Wrap>
      </Container>
    </Suspense>
  );
}
