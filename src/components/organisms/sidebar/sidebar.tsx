'use client';

import {Sticky} from '@/components';
import {useMenuContext} from '@/contexts';
import {useMatch} from '@/hooks';
import {Paths} from '@/utils';

import MiniSidebar from './mini-sidebar';
import {Container} from './sidebar.styled';
import SidebarDrawer from './sidebar-drawer';
import SidebarList from './sidebar-list';

export default function Sidebar() {
  const {isToggled$} = useMenuContext();
  const targetRoute = Paths.Video.Detail('').getRoute();
  const isVideoRoute = useMatch(targetRoute as string);
  const isToggled = isToggled$.use();
  const sidebar = isToggled ? (
    <Sticky offsetTop={10} offsetBottom={10}>
      <MiniSidebar />
    </Sticky>
  ) : (
    <Sticky offsetTop={10} offsetBottom={10}>
      <Container>
        <SidebarList />
      </Container>
    </Sticky>
  );

  return (
    <>
      <SidebarDrawer />
      {isVideoRoute ? null : sidebar}
    </>
  );
}
