import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext, useEffect, useState } from 'react';
import { RootContext } from '../context/root-context';
import { IWorkspace, sampleWorkspaces } from './api/sample';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [workspace, setWorkspace] = useState<IWorkspace | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      const workspace = sampleWorkspaces.find((w) => w.id === +router.query.id!);
      setWorkspace(workspace);
    }
  }, [router.query]);

  return (
    <RootContext.Provider value={{ darkMode, workspace, actions: { setDarkMode, setWorkspace } }}>
      <div className="text-gray-700">
        <Component {...pageProps} />{' '}
      </div>
    </RootContext.Provider>
  );
}

export default MyApp;
