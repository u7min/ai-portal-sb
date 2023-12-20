import { createContext, Dispatch, SetStateAction } from 'react';
import { IWorkspace } from '../pages/api/sample';

export interface IRootContext {
  darkMode: boolean;
  workspace: IWorkspace | undefined;
  actions: {
    setDarkMode: Dispatch<SetStateAction<boolean>>;
    setWorkspace: Dispatch<SetStateAction<IWorkspace | undefined>>;
  };
}

export const RootContext = createContext<IRootContext | undefined>(undefined);
