'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {Paths} from '@/utils';
import {Container, Item} from './navbar.styled';

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (link: string) => pathname.includes(link);

  return (
    <Container>
      <Item _isActive={isActive('/articles') || undefined}>
        <Link href='/articles'>Articles</Link>
      </Item>
      <Item _isActive={isActive('/pdf-articles') || undefined}>
        <Link href='/pdf-articles'>PDF Articles</Link>
      </Item>
      <Item _isActive={isActive('/about') || undefined}>
        <Link href='/'>About</Link>
      </Item>
      <Item _isActive={isActive(Paths.Quiz.getPath()) || undefined}>
        <Link href={Paths.Quiz.getPath()}>Quizzes</Link>
      </Item>
      <Item _isActive={isActive(Paths.WaterCrisis.getPath()) || undefined}>
        <Link href={Paths.WaterCrisis.getPath()}>Water Crisis</Link>
      </Item>
      <Item _isActive={isActive('/contact') || undefined}>
        <Link href='/'>Contact</Link>
      </Item>
    </Container>
  );
};

export default Navbar;
