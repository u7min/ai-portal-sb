import { NextPage } from 'next';
import Layout from '@components/layout';
import SvgLanguage from '@components/svgs/svg-language';
import { useContext, useState } from 'react';
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
      <div className="flex flex-col space-y-3 border-b">
        <div className="px-7 pt-3 flex flex-row justify-between items-center">
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
        <div className="px-7 pt-2 pb-3 flex flex-row items-center space-x-2 text-2xl">
          <SvgLanguage className="rounded-full bg-blue-500 w-6 h-6 text-white" />
          <h1>{workspace?.name}</h1>
        </div>
      </div>
      <div className="p-7 divide-y space-y-2 divide-gray-300 overflow-x-scroll">
        <div className="flex flex-row space-x-5 items-center tracking-tight whitespace-nowrap">
          <TabItem currentTab="tasks" title="Tasks" />
        </div>
        <div className="pt-5 flex flex-col space-y-10">
          <div className="flex flex-row items-center border rounded w-fit border-slate-300">
            <div
              className={cls(
                'cursor-pointer w-16 text-center rounded h-7 p-1',
                'text-sm hover:border hover:border-blue-500',
                status === 'ALL' ? 'border border-blue-500 bg-blue-100' : '',
              )}
              onClick={() => setStatus('ALL')}
            >
              All
            </div>
            <div onClick={() => setStatus(ETranslationTaskStatus.LOADING)}>
              <SvgLoading
                className={cls(
                  'cursor-pointer w-16 text-center rounded h-7 p-1',
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
                  'cursor-pointer w-16 text-center rounded h-7 p-1',
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
                  'cursor-pointer w-16 text-center rounded h-7 p-1',
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
                  'cursor-pointer w-16 text-center rounded h-7 p-1',
                  'hover:text-gray-500 hover:border hover:border-blue-500',
                  status === ETranslationTaskStatus.CANCELED
                    ? 'border border-blue-500 bg-blue-100 text-gray-500'
                    : '',
                )}
              />
            </div>
          </div>
          <table className="table-auto overflow-x-scroll whitespace-nowrap">
            <thead className="text-gray-500">
              <tr>
                <th className="font-normal text-start text-sm p-2">Task uuid</th>
                <th className="font-normal text-start text-sm p-2">Status</th>
                <th className="font-normal text-start text-sm p-2">Game</th>
                <th className="font-normal text-start text-sm p-2">Source / Target Language</th>
                <th className="font-normal text-start text-sm p-2">Apply Method</th>
                <th className="font-normal text-start text-sm p-2">Created At</th>
                <th className="font-normal text-start text-sm p-2">Duration</th>
              </tr>
            </thead>
            <tbody className="rounded border text-sm">
              {sampleTranslationTasks
                .filter((t) => t.status === status || status === 'ALL')
                .map((t, index) => (
                  <tr
                    className="border-b border-gray-200 hover:border-b-0 h-16 align-top hover:bg-blue-100 cursor-pointer hover:border-l-2 hover:border-blue-500 text-gray-500"
                    key={t.id}
                    onClick={() => router.push(`/translations/${id}/tasks/${t.uuid}`)}
                  >
                    <td className="p-2">{t.uuid}</td>
                    <td className="p-2">
                      <TranslationTaskStatus status={t.status} />
                    </td>
                    <td className="p-2">{t.game}</td>
                    <td className="p-2">
                      {t.sourceLan}
                      <br />
                      {t.targetLan.join(', ')}
                    </td>
                    <td className="p-2">{t.applyMethod}</td>
                    <td className="p-2">{t.createdAt}</td>
                    <td className="p-2">{t.duration}s</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
