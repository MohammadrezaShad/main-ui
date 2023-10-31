'use client';

import AuthSection from './auth-section';
import NavigationSection from './navigation-section';
import {Block} from './sidebar.styled';
import SocialMediaSection from './social-media-section';
import ThemeSection from './theme-section';
import {useSidebar} from './use-sidebar';

export default function SidebarList() {
  const {secontionOneList, secontionTwoList, secontionThreeList} = useSidebar();

  return (
    <>
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
    </>
  );
}
