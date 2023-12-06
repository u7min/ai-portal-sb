import { createContext } from 'react';

export interface IRootContext {
  darkMode: boolean;
  actions: {
    setDarkMode: () => {};
  };
}

export const RootContext = createContext<IRootContext>();
