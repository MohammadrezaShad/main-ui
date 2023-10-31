'use client';

import {css} from '@styled/css';
import dynamic from 'next/dynamic';

import {Logo, MenuButton} from '@/components';
import {useMenuContext} from '@/contexts';
import {useMatch} from '@/hooks';
import {Paths} from '@/utils';

import AuthSection from '../auth-section';
import NavigationSection from '../navigation-section';
import SocialMediaSection from '../social-media-section';
import ThemeSection from '../theme-section';
import {useSidebar} from '../use-sidebar';
import {Block, DrawerContainer, Head} from './sidebar-drawer.styled';

const Drawer = dynamic(() => import('@/components/molecules/drawer'), {ssr: false});

export default function SidebarDrawer() {
  const {secontionOneList, secontionTwoList, secontionThreeList} = useSidebar();
  const targetRoute = Paths.Video.Detail('').getRoute();
  const isVideoRoute = useMatch(targetRoute as string);
  const {isToggled$} = useMenuContext();
  const isToggled = isToggled$.use();
  const onClose = () => {
    isToggled$.set(false);
  };

  return (
    <Drawer
      open={isToggled}
      onClose={onClose}
      placement='right'
      width='350px'
      classNames={{
        mask: isVideoRoute ? undefined : css({hideFrom: 'lg'}),
        wrapper: isVideoRoute ? undefined : css({hideFrom: 'lg'}),
      }}
    >
      <DrawerContainer>
        <Head>
          <MenuButton className={css({ml: 5})} />
          <Logo />
        </Head>
        <Block>
          <NavigationSection list={secontionOneList} />
        </Block>
        <Block>
          <AuthSection />
        </Block>
        <Block>
          <NavigationSection list={secontionTwoList} />
        </Block>
        <Block>
          <ThemeSection />
        </Block>
        <Block>
          <NavigationSection list={secontionThreeList} />
        </Block>
        <Block>
          <SocialMediaSection />
        </Block>
      </DrawerContainer>
    </Drawer>
  );
}
