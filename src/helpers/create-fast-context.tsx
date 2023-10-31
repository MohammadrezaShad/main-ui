'use client';

import {createContext, useContext, useMemo} from 'react';

import {createStore} from './create-store';

export function createFastContext<Store>(initialState: Store) {
  function useStoreData(data?: Store) {
    const store = useMemo(() => createStore(data || initialState), [data]);
    return store;
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

  const StoreContext = createContext<UseStoreDataReturnType | null>(null);

  function Provider({children, data}: {children: React.ReactNode; data?: Store}) {
    return <StoreContext.Provider value={useStoreData(data)}>{children}</StoreContext.Provider>;
  }

  function useStoreContext<SelectorOutput>(
    selector: (store: Store) => SelectorOutput,
  ): [SelectorOutput, (value: Partial<Store>) => void, (initialServerState: Store) => void] {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('StoreContext must be used within a <Provider />');
    }

    const state = store.useStore(selector);

    return [state, store.set, store.serverInitialize];
  }

  return {
    Provider,
    useStoreContext,
  };
}
