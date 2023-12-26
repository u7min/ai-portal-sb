import { NextPage } from 'next';
import Layout from '@components/layout';
import SvgLanguage from '@components/svgs/svg-language';
import React, { useContext, useState } from 'react';
import { cls } from '@libs/client/utils';
import SvgCanceled from '@components/svgs/svg-canceled';
import SvgFailed from '@components/svgs/svg-failed';
import SvgSuccess from '@components/svgs/svg-success';
import SvgLoading from '@components/svgs/svg-loading';
import { useRouter } from 'next/router';
import { ETranslationTaskStatus, sampleTranslationTasks } from '../../api/sample';
import Navigator from '@components/navigator';
import { RootContext } from '../../../context/root-context';
import { TranslationTaskStatus } from '@components/status';

type TabType = 'tasks';

const Index: NextPage = () => {
  const router = useRouter();
  const ctx = useContext(RootContext);
  const workspace = ctx?.workspace;
  const { id } = router.query;
  const [tab, setTab] = useState<TabType>('tasks');
  const [status, setStatus] = useState<ETranslationTaskStatus | 'ALL'>('ALL');

  const TabItem = ({ currentTab, title }: { currentTab: TabType; title: string }) => {
    return (
      <div
        className={cls(
          tab === currentTab ? 'underline underline-offset-[13px] font-semibold' : '',
          'cursor-pointer hover:text-pink-600',
        )}
        onClick={() => setTab(currentTab)}
      >
        {title}
      </div>
    );
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-3">
        <div className="px-7 pt-4 flex flex-row justify-between items-center">
          <Navigator
            paths={[
              { path: '/workspaces', text: 'Workspaces' },
              {
                path: `/workspaces/${workspace?.id}`,
                text: workspace?.name,
                type: workspace?.template.type,
              },
              { text: 'Tasks' },
            ]}
          />
          <div className="flex flex-row items-center space-x-2">
            <div
              className="py-0.5 px-3 text-sm rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
              onClick={() => router.push(`/translations/${id}/tasks/create`)}
            >
              Translation
            </div>
          </div>
        </div>
        <div className="px-7 pt-2 flex flex-row items-center space-x-2 text-2xl">
          <SvgLanguage className="rounded-full bg-blue-500 w-6 h-6 text-white" />
          <h1>{workspace?.name}</h1>
        </div>
      </div>
      <div className="p-7 divide-y space-y-2 divide-gray-300 overflow-x-scroll">
        <div className="flex flex-row space-x-5 items-center tracking-tight whitespace-nowrap">
          <TabItem currentTab="tasks" title="Tasks" />
        </div>
        <div className="pt-5 flex flex-col space-y-5">
          <div className="flex flex-row space-x-3 items-center">
            <div className="flex flex-row items-center border rounded w-fit border-slate-300 text-xs">
              <div
                className={cls(
                  'cursor-pointer w-14 text-center rounded h-5 p-1 pt-0',
                  'hover:border hover:border-blue-500',
                  status === 'ALL' ? 'border border-blue-500 bg-blue-100' : '',
                )}
                onClick={() => setStatus('ALL')}
              >
                All
              </div>
              <div onClick={() => setStatus(ETranslationTaskStatus.LOADING)}>
                <SvgLoading
                  className={cls(
                    'cursor-pointer w-14 text-center rounded h-5 p-0.5',
                    'hover:text-gray-500 hover:border hover:border-blue-500',
                    status === ETranslationTaskStatus.LOADING
                      ? 'border border-blue-500 bg-blue-100 text-gray-500'
                      : '',
                  )}
                />
              </div>
              <div onClick={() => setStatus(ETranslationTaskStatus.SUCCESS)}>
                <SvgSuccess
                  className={cls(
                    'cursor-pointer w-14 text-center rounded h-5 p-0.5',
                    'hover:text-green-600 hover:border hover:border-blue-500',
                    status === ETranslationTaskStatus.SUCCESS
                      ? 'border border-blue-500 bg-blue-100 text-green-600'
                      : '',
                  )}
                />
              </div>
              <div onClick={() => setStatus(ETranslationTaskStatus.FAILED)}>
                <SvgFailed
                  className={cls(
                    'cursor-pointer w-14 text-center rounded h-5 p-0.5',
                    'hover:text-red-500 hover:border hover:border-blue-500',
                    status === ETranslationTaskStatus.FAILED
                      ? 'border border-blue-500 bg-blue-100 text-red-500'
                      : '',
                  )}
                />
              </div>
              <div onClick={() => setStatus(ETranslationTaskStatus.CANCELED)}>
                <SvgCanceled
                  className={cls(
                    'cursor-pointer w-14 text-center rounded h-5 p-0.5',
                    'hover:text-gray-500 hover:border hover:border-blue-500',
                    status === ETranslationTaskStatus.CANCELED
                      ? 'border border-blue-500 bg-blue-100 text-gray-500'
                      : '',
                  )}
                />
              </div>
            </div>
            <div className="relative text-xs">
              <div className="absolute pointer-events-none pl-2 pt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 text-slate-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="w-52 rounded h-[17pt] p-1 pl-7 border-slate-300 placeholder:text-gray-400 text-xs"
                placeholder="Filter by task uuid"
              />
            </div>
          </div>
          <table className="table-auto overflow-x-auto whitespace-nowrap text-[10pt]">
            <thead className="text-gray-500">
              <tr>
                <th className="font-normal text-start p-3">Task uuid</th>
                <th className="font-normal text-start p-3">Status</th>
                <th className="font-normal text-start p-3">Game</th>
                <th className="font-normal text-start p-3">Source / Target Language</th>
                <th className="font-normal text-start p-3">Apply Method</th>
                <th className="font-normal text-start p-3">Created At</th>
                <th className="font-normal text-start p-3">Duration</th>
              </tr>
            </thead>
            <tbody className="rounded border">
              {sampleTranslationTasks
                .filter((t) => t.status === status || status === 'ALL')
                .map((t, index) => (
                  <tr
                    className="border-b border-gray-200 hover:border-b-0 h-16 align-top hover:bg-blue-100 cursor-pointer hover:border-l-2 hover:border-blue-500 text-gray-500"
                    key={t.id}
                    onClick={() => router.push(`/translations/${id}/tasks/${t.uuid}`)}
                  >
                    <td className="p-3">{t.uuid}</td>
                    <td className="p-3">
                      <TranslationTaskStatus status={t.status} />
                    </td>
                    <td className="p-3">{t.game}</td>
                    <td className="p-3">
                      {t.sourceLan}
                      <br />
                      {t.targetLan.join(', ')}
                    </td>
                    <td className="p-3">{t.applyMethod}</td>
                    <td className="p-3">{t.createdAt}</td>
                    <td className="p-3">{t.duration}s</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="text-gray-400 text-sm">{sampleTranslationTasks.length} tasks found</div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
