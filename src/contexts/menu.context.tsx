import {createContext, useContext} from 'react';
import {Observable} from '@legendapp/state';

export type MenuContextType = {
  isToggled$: Observable<boolean>;
};

const MenuContext = createContext<MenuContextType>({} as MenuContextType);

function useMenuContext() {
  const menuContext = useContext(MenuContext);
  if (!MenuContext) {
    throw new Error('MenuContext must be used within a <Provider />');
  }

  return menuContext;
}

export {useMenuContext, MenuContext};
