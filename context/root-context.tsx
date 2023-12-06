import { createContext, Dispatch, SetStateAction } from 'react';

export interface IRootContext {
  darkMode: boolean;
  actions: {
    setDarkMode: Dispatch<SetStateAction<boolean>>;
  };
}

export const RootContext = createContext<IRootContext | undefined>(undefined);
