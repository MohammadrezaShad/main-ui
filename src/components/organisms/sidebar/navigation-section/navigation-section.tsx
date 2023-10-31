'use client';

import React from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {Container, Item, linkClass, Text} from './navigation-section.styled';

export interface NavigationItem {
  text: string;
  link: string;
  icon: string;
}

interface NavigationSectionProps {
  list: NavigationItem[];
}

export default React.memo(function NavigationSection({list}: NavigationSectionProps) {
  const pathname = usePathname();
  return (
    <Container>
      {list.map(({icon: Icon, link, text}) => (
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
});
