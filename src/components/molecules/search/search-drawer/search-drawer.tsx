'use client';

import {Observable} from '@legendapp/state';
import {css} from '@styled/css';
import dynamic from 'next/dynamic';

import {IconArrowRight as Arrow} from '@/assets';
import {TextField} from '@/components';

import {DrawerContainer} from './search-drawer.styled';

const Drawer = dynamic(() => import('@/components/molecules/drawer'), {ssr: false});

interface SearchDrawerProps {
  isOpen$: Observable<boolean>;
}

export default function SearchDrawer({isOpen$}: SearchDrawerProps) {
  const isOpen = isOpen$.use();

  const onClose = () => {
    isOpen$.set(false);
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      placement='top'
      height='max-content'
      classNames={{
        mask: css({hideFrom: 'md'}),
        wrapper: css({hideFrom: 'md'}),
      }}
    >
      <DrawerContainer>
        <Arrow className={css({cursor: 'pointer'})} onClick={onClose} />
        <TextField
          placeholder='Search'
          className={css({pr: 4, mr: 4, w: '100%', textAlign: 'left !important'})}
          classes={{container: css({w: '100%'})}}
        />
      </DrawerContainer>
    </Drawer>
  );
}
