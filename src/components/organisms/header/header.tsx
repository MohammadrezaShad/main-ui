'use client';

import {useObservable} from '@legendapp/state/react';
import {css} from '@styled/css';

import {IconSearch} from '@/assets';
import {AuthButton, Logo, MenuButton, SearchBar, SearchDrawer} from '@/components';

import {Container, Wrap} from './header.styled';

interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const isOpen$ = useObservable(false);

  return (
    <Container>
      <Wrap>
        <MenuButton className={css({ml: 5})} />
        <Logo />
        <SearchBar className={css({mr: {base: 36, lgDown: 20}, ml: 5, hideBelow: 'md'})} />
        <AuthButton className={css({mr: 'auto', w: '128px', hideBelow: 'md'})} />{' '}
        <IconSearch
          className={css({hideFrom: 'md', mr: 'auto', cursor: 'pointer'})}
          onClick={() => isOpen$.set(true)}
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
      </Wrap>
    </Container>
  );
}
