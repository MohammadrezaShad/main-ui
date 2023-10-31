'use client';

import {useSyncExternalStore} from 'react';

type Listener<State> = (state: State) => void;

export function createStore<State>(initialState: State) {
  let currentState = initialState;
  let serverState: State | null = null;
  const listeners = new Set<Listener<State>>();
  const subscribe = (listener: Listener<State>) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    get: () => currentState,
    set: (value: Partial<State>) => {
      currentState = {...currentState, ...value};
      listeners.forEach(listener => listener(currentState));
    },
    subscribe,
    getServerState: () => serverState || initialState,
    serverInitialize: (initialServerState: State) => {
      if (!serverState) {
        currentState = initialServerState;
        serverState = initialServerState;
      }
    },
    useStore: <SelecterOutput>(selector: (state: State) => SelecterOutput): SelecterOutput =>
      useSyncExternalStore(
        subscribe,
        () => selector(currentState),
        () => selector(serverState ?? initialState),
      ),
  };
}
