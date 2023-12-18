import React, { useState } from 'react';
import Image from 'next/image';
import logo from '/public/ai-studio-2.png';
import profile from '/public/profile.png';
import SvgPlus from '@components/svgs/svg-plus';
import SvgQuestion from '@components/svgs/svg-question';
import SvgStarSolid from '@components/svgs/svg-star-solid';
import SvgDirectionDown from '@components/svgs/svg-direction-down';
import SvgDirectionRight from '@components/svgs/svg-direction-right';
import SvgCube from '@components/svgs/svg-cube';
import { useRouter } from 'next/router';
import { cls } from '@libs/client/utils';

interface LayoutProps {
  hasLeftMenu?: boolean;
  children: React.ReactNode;
}

const Layout = ({ hasLeftMenu, children }: LayoutProps) => {
  const [collapseWorkspaces, setCollapseWorkspaces] = useState(true);

  const router = useRouter();
  return (
    <div className="h-screen w-full">
      <div className="bg-black h-20 flex flex-row justify-between">
        <div className="flex h-full flex-row items-center px-3 space-x-6">
          <Image
            src={logo}
            className="cursor-pointer rounded-lg"
            width={50}
            height={50}
            alt="Home"
          />
          <div className="text-gray-200 flex flex-row items-center space-x-1">
            <span
              className="hover:underline cursor-pointer"
              onClick={() => router.push('/workspaces')}
            >
              Workspaces
            </span>
            <div onClick={() => router.push('/workspaces/create')}>
              <SvgPlus className="w-5 h-5 text-yellow-600 hover:text-pink-600 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="flex flex-row h-full items-center space-x-3 text-gray-400 px-3">
          <div>Theme: Light</div>
          <div>Administration</div>
          <div>
            <SvgQuestion className="w-6 h-6" />
          </div>
          <div>
            <Image
              src={profile}
              className="cursor-pointer"
              width={40}
              height={37}
              alt="Home"
              onClick={() => router.push('/login')}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row h-full">
        {hasLeftMenu ? (
          <div className="w-1/5 border-r py-5 flex flex-col items-start min-w-fit space-y-4 hidden sm:block">
            <div className="relative px-5">
              <div className="absolute left-5 pointer-events-none pl-2 pt-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <input type="text" className="w-44 rounded h-7 p-1 pl-7" />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <div className="tracking-wider text-sm px-5">FAVORITES</div>
              <div className="flex flex-row space-x-1 h-7 px-5 items-center hover:bg-blue-200 w-full cursor-pointer">
                <SvgStarSolid />
                <span onClick={() => router.push('/workspaces')}>Workspaces</span>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-row h-7 items-center hover:bg-blue-200">
                <div
                  onClick={() => setCollapseWorkspaces((prev) => !prev)}
                  className="hover:text-pink-600 cursor-pointer"
                >
                  {collapseWorkspaces ? <SvgDirectionDown /> : <SvgDirectionRight />}
                </div>
                <div className="tracking-wider text-sm">WORKSPACES</div>
              </div>
              {collapseWorkspaces ? (
                <div>
                  <div className="flex flex-row space-x-1 h-7 px-5 items-center hover:bg-blue-200 w-full cursor-pointer">
                    <SvgCube className="w-5 h-5 text-yellow-600" />
                    <span onClick={() => router.push('/workspaces/3')}>test-ai-workspace</span>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className={cls(hasLeftMenu ? 'w-full' : 'w-full')}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
