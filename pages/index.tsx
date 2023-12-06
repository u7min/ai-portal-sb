import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black h-screen flex flex-col items-center justify-between text-white">
      <div></div>
      <div className="flex flex-col items-center space-y-5">
        <h1 className="font-medium text-5xl">MAGELLAN AI PORTAL</h1>
        <div
          className="text-blue-400 ring-2 rounded-full ring-blue-400 hover:ring-blue-500 hover:ring-4 cursor-pointer"
          onClick={() => router.push('/dashboard')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-14 h-14"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>애플리케이션이 로드되는 동안 잠시 기다려 주세요.</div>
      </div>
      <div></div>
    </div>
  );
};

export default Index;
