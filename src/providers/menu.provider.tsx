'use client';

import React from 'react';
import {useObservable} from '@legendapp/state/react';

import {MenuContext} from '@/contexts';

type MenuProviderProps = {
  children: React.ReactNode;
};

export default function MenuProvider({children}: MenuProviderProps) {
  const isOpen$ = useObservable(false);

  return (
    <MenuContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isToggled$: isOpen$,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
