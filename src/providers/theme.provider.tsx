'use client';

import React from 'react';
import {useObservable} from '@legendapp/state/react';
import {setCookie} from 'cookies-next';

import {CookieName, THEME_ATTR, ThemeType} from '@/constants';
import {ThemeContext} from '@/contexts';

type ThemeProviderProps = {
  children: React.ReactNode;
  theme: ThemeType;
};

export default function ThemeProvider({children, theme: initialTheme}: ThemeProviderProps) {
  const theme = useObservable(initialTheme);

  const handleChangeTheme = React.useMemo(
    () => (inputTheme: ThemeType) => {
      document?.documentElement?.setAttribute(THEME_ATTR, inputTheme);
      setCookie(CookieName.THEME, inputTheme);
      theme.set(inputTheme);
    },
    [],
  );

  return (
    <ThemeContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        theme,
        handleChangeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
