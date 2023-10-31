'use client';

import {css, cx} from '@styled/css';

import {IconSearch} from '@/assets';
import {TextField} from '@/components';

import {Container, IconWrap} from './search-bar.styled';

interface SearchBarProps {
  text?: string;
  className?: string;
}

export default function SearchBar({text, className}: SearchBarProps) {
  const defaultClassName = css({w: '100%'});
  const searchBarClass = cx(defaultClassName, className);

  return (
    <Container className={searchBarClass}>
      <TextField placeholder='جستجو در سایت...' className={css({pl: 9})} />
      <IconWrap>
        <IconSearch />
      </IconWrap>
    </Container>
  );
}
