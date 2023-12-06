import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between bg-black">
      <div className="w-full sm:w-1/2 h-screen flex flex-col">
        <h1 className="text-xl text-white px-5 py-2">MAGELLAN AI PORTAL</h1>
        <div className="h-full flex items-center justify-center">
          <div className="bg-white w-2/3 h-1/2 p-5 space-y-3 rounded">
            <h2 className="text-xl">PORTAL LOGIN</h2>
            <div className="text-sm">MAGELLAN AI PORTAL 에 연결하는 동안 기다려 주세요.</div>
            <div className="flex flex-col space-y-3 ">
              <input type="text" className="rounded" />
              <input type="password" className="rounded" />
              <button
                className="bg-gray-500 text-white rounded h-11 focus:ring-2 ring-offset-4 hover:bg-gray-600"
                onClick={() => router.push('loading')}
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block sm:w-1/2 bg-slate-400 h-screen">
        <img
          src="/MetaHuman_update_Nov22_02.jpg"
          alt=""
          className="w-full h-full object-cover object-right"
        />
      </div>
    </div>
  );
};

export default Login;
