import {Observable} from '@legendapp/state';
import {createContext, useContext} from 'react';

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
