'use client';

import React from 'react';
import {useObservable} from '@legendapp/state/react';

import {AuthContext} from '@/contexts';

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function MenuProvider({children}: AuthProviderProps) {
  const isLoginOpen$ = useObservable(false);
  const isSignUpOpen$ = useObservable(false);

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isLoginOpen$,
        isSignUpOpen$,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
