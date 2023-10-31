'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {useSidebar} from '../use-sidebar';
import {Container, Item, linkClass, Text} from './mini-sidebar.styled';

export default function MiniSidebar() {
  const {secontionOneList, secontionTwoList} = useSidebar();
  const pathname = usePathname();

  return (
    <Container>
      {secontionOneList.map(({icon: Icon, link, text}) => (
        <Item active={pathname === link} key={link}>
          <Link href={link} className={linkClass}>
            <Icon />
            <Text active={pathname === link} key={link}>
              {text}
            </Text>
          </Link>
        </Item>
      ))}
      {secontionTwoList.map(({icon: Icon, link, text}) => (
        <Item active={pathname === link} key={link}>
          <Link href={link} className={linkClass}>
            <Icon />
            <Text active={pathname === link} key={link}>
              {text}
            </Text>
          </Link>
        </Item>
      ))}
    </Container>
  );
}
