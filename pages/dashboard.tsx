import { NextPage } from 'next';
import DashboardBox from '../components/dashboard-box';
import Menu from '../components/menu';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { IMenuTitleProps } from '../components/menu-title';
import { RootContext } from '../context/root-context';

const CreateModalMenuTitle: NextPage<IMenuTitleProps> = ({ title, svg }) => {
  return (
    <div className="dark:hover:text-white hover:font-semibold cursor-pointer">
      <div className="inline-flex space-x-1.5">
        {svg}
        <span className="whitespace-nowrap overflow-x-hidden">{title}</span>
      </div>
    </div>
  );
};

const Dashboard: NextPage = () => {
  const router = useRouter();
  const rootCtx = useContext(RootContext);
  const darkMode = rootCtx?.darkMode!;
  const setDarkMode = rootCtx?.actions.setDarkMode!;
  const [createModalShow, setCreateModalShow] = useState(false);
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div
        className={`flex flex-col h-screen dark:bg-black dark:text-white ${
          createModalShow ? 'opacity-80 blur-sm' : ''
        }`}
      >
        <div className="h-14 flex items-center justify-between">
          <div className="px-2 w-full">
            <input
              type="text"
              className="h-8 w-1/2 dark:bg-black border-0 focus:ring-0"
              placeholder="Search"
            />
          </div>
          <div className="pr-2 flex flex-row space-x-3 items-center">
            <div
              className="cursor-pointer hover:text-green-500"
              onClick={() => setDarkMode((prev) => !prev)}
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              )}
            </div>
            <button
              className="border border-black dark:bg-gray-500 rounded py-1 px-2 text-sm dark:hover:bg-gray-600 hover:ring-1 ring-offset-4 ring-gray-400 dark:ring-offset-black"
              onClick={() => router.push('/login')}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex flex-row border-t divide-x h-full divide-gray-500 border-gray-500">
          <Menu />
          <div className="divide-y w-full md:w-4/5 divide-gray-500">
            <div className="h-24 flex flex-col space-y-1 justify-center">
              <div className="h-10 px-3 text-2xl">All Workspaces</div>
              <div className="px-3 text-sm dark:text-gray-400">
                워크스페이스를 생성하시려면 새 워크스페이스를 선택해 주세요.
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 p-5 gap-5">
              <div
                className="border h-36 flex flex-col items-center divide-y bg-gray-600 text-white shadow-2xl border-gray-300 cursor-pointer hover:ring-2 ring-offset-4 ring-gray-500 dark:ring-offset-gray-900"
                onClick={() => setCreateModalShow(true)}
              >
                <div className="h-3/5 w-full p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                    />
                  </svg>
                </div>
                <div className="h-2/5 w-full px-4 flex items-center justify-between bg-gray-00 rounded-b-md">
                  <div className="text-sm">새 워크스페이스</div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <DashboardBox subject="메이브 목소리 변환 프로젝트" />
              <DashboardBox subject="킹오파 올스타 기계 번역" />
              <DashboardBox subject="모두의 마블 기계 번역" />
              <DashboardBox subject="킹오파 TTS 프로젝트" />
              <DashboardBox subject="킹오파 VC 프로젝트" />
            </div>
          </div>
        </div>
      </div>
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          !createModalShow ? 'hidden' : ''
        } backdrop-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex flex-row dark:text-white`}
      >
        <div className="relative p-5 w-full max-w-5xl max-h-full">
          <div className="relative bg-white dark:bg-black rounded-lg shadow-xl dark:shadow-black border border-gray-600">
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-700 rounded">
              <h3 className="text-xl font-semibold dark:text-gray-300">Create Workspace</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="default-modal"
                onClick={() => setCreateModalShow(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex flex-row">
              <div className="w-1/3 p-5">
                <div>
                  <input
                    type="text"
                    className="dark:bg-gray-500 w-full dark:placeholder-gray-300 h-8"
                    placeholder="Search templates"
                  />
                  <div className="py-5 flex flex-col space-y-3">
                    <div className="font-semibold">All templates</div>
                    <div className="flex flex-col space-y-1">
                      <CreateModalMenuTitle title="Voice AI" />
                      <CreateModalMenuTitle title="Machine Translation" />
                      <CreateModalMenuTitle title="SDFA" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-2/3 p-5 flex flex-col space-y-3">
                <div>All templates</div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                  <DashboardBox subject="메이브 목소리 변환 프로젝트" />
                  <DashboardBox subject="메이브 목소리 변환 프로젝트" />
                  <DashboardBox subject="메이브 목소리 변환 프로젝트" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
