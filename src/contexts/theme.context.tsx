import {createContext, useContext} from 'react';
import {Observable} from '@legendapp/state';

import {ThemeType} from '@/constants';

export type ThemeContextType = {
  theme: Observable<ThemeType>;
  handleChangeTheme?: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function useThemeContext() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('ThemeContext must be used within a <Provider />');
  }

  return themeContext;
}

export {useThemeContext, ThemeContext};
