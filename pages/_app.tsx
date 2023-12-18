import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext, useState } from 'react';
import { RootContext } from '../context/root-context';

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <RootContext.Provider value={{ darkMode, actions: { setDarkMode } }}>
      <div className="text-gray-700">
        <Component {...pageProps} />{' '}
      </div>
    </RootContext.Provider>
  );
}

export default MyApp;
