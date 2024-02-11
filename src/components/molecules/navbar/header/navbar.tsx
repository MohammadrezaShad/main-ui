'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {Container, Item} from './navbar.styled';

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (link: string) => pathname.includes(link);

  return (
    <Container>
      <Item _isActive={isActive('/articles') || undefined}>
        <Link href='/articles'>Articles</Link>
      </Item>
      <Item _isActive={isActive('/about') || undefined}>
        <Link href='/'>About</Link>
      </Item>
      <Item _isActive={isActive('/quizzes') || undefined}>
        <Link href='/quizzes'>Quizzes</Link>
      </Item>
      <Item _isActive={isActive('/water-crisis') || undefined}>
        <Link href='/'>Water Crisis</Link>
      </Item>
      <Item _isActive={isActive('/contact') || undefined}>
        <Link href='/'>Contact</Link>
      </Item>
    </Container>
  );
};

export default Navbar;
