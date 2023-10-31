'use client';

import React from 'react';

import {IconMoon} from '@/assets';
import {Switch} from '@/components';
import {ThemeType} from '@/constants';
import {useThemeContext} from '@/contexts';

import {Container, Item, Text} from './theme-section.styled';

export default React.memo(function ThemeSection() {
  const {theme, handleChangeTheme} = useThemeContext();
  const currentTheme = theme.use();
  const nextTheme = currentTheme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK;

  return (
    <Container>
      <Item>
        <IconMoon />
        <Text>حالت شب</Text>
      </Item>
      <Switch
        checked={currentTheme === ThemeType.DARK}
        onChange={() => handleChangeTheme?.(nextTheme)}
      />
    </Container>
  );
});
