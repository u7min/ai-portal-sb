import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext, useState } from 'react';
import { RootContext } from '../context/root-context';

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <RootContext.Provider value={{ darkMode, actions: { setDarkMode } }}>
      <Component {...pageProps} />{' '}
    </RootContext.Provider>
  );
}

export default MyApp;
