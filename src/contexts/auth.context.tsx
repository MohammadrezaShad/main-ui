import {createContext, useContext} from 'react';
import {Observable} from '@legendapp/state';

export type AuthContextType = {
  isLoginOpen$: Observable<boolean>;
  isSignUpOpen$: Observable<boolean>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function useAuthContext() {
  const authContext = useContext(AuthContext);
  if (!AuthContext) {
    throw new Error('AuthContext must be used within a <Provider />');
  }

  return authContext;
}

export {AuthContext, useAuthContext};
