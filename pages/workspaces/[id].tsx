import { NextPage } from 'next';
import Layout from '@components/layout';
import SvgStar from '@components/svgs/svg-star';
import SvgLanguage from '@components/svgs/svg-language';
import { useState } from 'react';
import { cls } from '@libs/client/utils';
import SvgCanceled from '@components/svgs/svg-canceled';
import SvgFailed from '@components/svgs/svg-failed';
import SvgSuccess from '@components/svgs/svg-success';
import SvgLoading from '@components/svgs/svg-loading';

type TabType = 'overview' | 'tasks' | 'statistics' | 'glossaries' | 'system-glossaries';
type StatusType = 'all' | 'loading' | 'success' | 'failed' | 'canceled';

const Index: NextPage = () => {
  const [tab, setTab] = useState<TabType>('overview');
  const [status, setStatus] = useState<StatusType>('all');
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
      <div className="p-7 flex flex-col space-y-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-2 text-2xl">
            <div className="rounded-full bg-blue-500 w-7 h-7">
              <SvgLanguage className="w-6 h-6 text-white" />
            </div>
            <h1>test-ai-workspace</h1>
            <SvgStar />
          </div>
          <div className="flex flex-row items-center space-x-2">
            <div className="bg-blue-500 py-0.5 px-3 text-sm rounded text-white">Run</div>
          </div>
        </div>
        <div className="divide-y space-y-2 divide-gray-300 overflow-x-scroll">
          <div className="flex flex-row space-x-5 items-center tracking-tight whitespace-nowrap">
            <TabItem currentTab="overview" title="Overview" />
            <TabItem currentTab="tasks" title="Tasks" />
            <TabItem currentTab="statistics" title="Statistics" />
            <TabItem currentTab="glossaries" title="Glossaries" />
            <TabItem currentTab="system-glossaries" title="System Glossaries" />
          </div>
          <div className="pt-5 flex flex-col space-y-10">
            <div className="flex flex-row items-center border rounded w-fit border-slate-300">
              <div
                className={cls(
                  'cursor-pointer w-16 text-center rounded h-7 p-1',
                  'text-sm hover:border hover:border-blue-500',
                  status === 'all' ? 'border border-blue-500 bg-blue-100' : '',
                )}
                onClick={() => setStatus('all')}
              >
                All
              </div>
              <div onClick={() => setStatus('loading')}>
                <SvgLoading
                  className={cls(
                    'cursor-pointer w-16 text-center rounded h-7 p-1',
                    'hover:text-gray-500 hover:border hover:border-blue-500',
                    status === 'loading' ? 'border border-blue-500 bg-blue-100 text-gray-500' : '',
                  )}
                />
              </div>
              <div onClick={() => setStatus('success')}>
                <SvgSuccess
                  className={cls(
                    'cursor-pointer w-16 text-center rounded h-7 p-1',
                    'hover:text-green-600 hover:border hover:border-blue-500',
                    status === 'success' ? 'border border-blue-500 bg-blue-100 text-green-600' : '',
                  )}
                />
              </div>
              <div onClick={() => setStatus('failed')}>
                <SvgFailed
                  className={cls(
                    'cursor-pointer w-16 text-center rounded h-7 p-1',
                    'hover:text-red-500 hover:border hover:border-blue-500',
                    status === 'failed' ? 'border border-blue-500 bg-blue-100 text-red-500' : '',
                  )}
                />
              </div>
              <div onClick={() => setStatus('canceled')}>
                <SvgCanceled
                  className={cls(
                    'cursor-pointer w-16 text-center rounded h-7 p-1',
                    'hover:text-gray-500 hover:border hover:border-blue-500',
                    status === 'canceled' ? 'border border-blue-500 bg-blue-100 text-gray-500' : '',
                  )}
                />
              </div>
            </div>
            <table className="table-auto overflow-x-scroll whitespace-nowrap">
              <thead className="text-gray-500">
                <th className="font-normal text-start text-sm p-2">Task uuid</th>
                <th className="font-normal text-start text-sm p-2">Status</th>
                <th className="font-normal text-start text-sm p-2">Upload File</th>
                <th className="font-normal text-start text-sm p-2">Game</th>
                <th className="font-normal text-start text-sm p-2">Source / Target Language</th>
                <th className="font-normal text-start text-sm p-2">Apply Method</th>
                <th className="font-normal text-start text-sm p-2">Created At</th>
                <th className="font-normal text-start text-sm p-2">Duration</th>
              </thead>
              <tbody className="rounded border text-sm">
                {[1, 2, 3, 4].map((x, index) => (
                  <tr
                    className="border-b border-gray-200 hover:border-b-0 h-16 align-top hover:bg-blue-100 cursor-pointer hover:border-l-2 hover:border-blue-500 text-gray-500"
                    key={index}
                  >
                    <td className="p-2">#1</td>
                    <td className="p-2">
                      <div className="flex flex-row space-x-0.5 text-green-600">
                        <SvgSuccess />
                        <span>Success</span>
                      </div>
                    </td>
                    <td className="p-2">C:/abc/ddddd/xxxxx.xls</td>
                    <td className="p-2">SevenNights</td>
                    <td className="p-2">
                      English
                      <br />
                      Russian, Spanish
                    </td>
                    <td className="p-2">Google</td>
                    <td className="p-2">15 Dec 23 12:23</td>
                    <td className="p-2">23s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
