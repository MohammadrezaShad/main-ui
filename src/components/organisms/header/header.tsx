'use client';

import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';

import {IconSearch} from '@/assets';
import {AuthButton, HeaderNavbar, Login, Logo, SearchDrawer, SignUp} from '@/components';

import {Container, Wrap} from './header.styled';

interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const isOpen$ = useObservable(false);
  const isLoginOpen$ = useObservable(false);
  const isSignUpOpen$ = useObservable(false);

  return (
    <Container>
      <Wrap>
        <Logo />
      </Wrap>
      <Wrap>
        <HeaderNavbar />
        <IconSearch
          className={css({cursor: 'pointer', mx: 12})}
          onClick={() => isOpen$.set(true)}
        />
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
        <AuthButton
          className={css({
            mr: 5,
            minW: '32px',
            w: '32px',
            h: '32px',
            rounded: '50%',
            hideFrom: 'md',
            p: '0',
            border: '1px solid token(colors.strokeSecondary)',
          })}
          text=' '
        />
        <SearchDrawer isOpen$={isOpen$} />
        <Login isOpen$={isLoginOpen$} />
        <SignUp isOpen$={isSignUpOpen$} />
      </Wrap>
    </Container>
  );
}
