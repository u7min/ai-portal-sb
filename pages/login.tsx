import { NextPage } from 'next';
import googleIcon from '/public/google-icon.png';
import logo from '/public/ai-studio-2.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type LoginMethod = 'google' | 'email' | undefined;

const Login: NextPage = () => {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>(undefined);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    if (loginMethod && loginMethod !== 'email') {
      setErrorMessage(`Not support ${loginMethod} login now. Please login below link.`);
    }
  }, [loginMethod]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center space-y-7 max-w-sm w-full">
        <div className="">
          <Image src={logo} width={110} height={110} className="rounded-2xl" alt="" />
        </div>
        <div className="flex flex-col items-center space-y-3 w-full">
          <h2 className="text-2xl font-medium">Log in to AI Studio</h2>
          <div>
            <Image
              onClick={() => setLoginMethod('google')}
              src={googleIcon}
              className="cursor-pointer"
              width={30}
              height={30}
              alt="google login"
            />
          </div>
          {errorMessage && <div className="text-sm text-red-800 font-semibold">{errorMessage}</div>}
          {loginMethod !== 'email' ? (
            <div
              className="underline text-gray-400 text-sm cursor-pointer hover:text-yellow-600"
              onClick={() => setLoginMethod('email')}
            >
              continue with email/password
            </div>
          ) : (
            <div className="flex flex-col space-y-3 w-full">
              <div>
                <div className="text-sm font-semibold">Email</div>
                <input type="text" className="h-7 rounded p-1 shadow w-full" />
              </div>
              <div>
                <div className="text-sm font-semibold">Password</div>
                <input type="password" className="h-7 rounded p-1 shadow w-full" />
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row space-x-2 items-center">
                  <input type="checkbox" className="rounded" />
                  <span>Remember me</span>
                </div>
                <div>Reset password</div>
              </div>
              <div>
                <button
                  className="border rounded w-full h-10 border-gray-500 hover:border-blue-500 hover:border-2"
                  onClick={() => router.push('/workspaces')}
                >
                  Log in
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="text-gray-500 text-sm">Magellan MLOps</div>
      </div>
    </div>
  );
};

export default Login;
