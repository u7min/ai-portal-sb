import { NextPage } from 'next';
import Layout from '@components/layout';
import { useContext, useEffect, useState } from 'react';
import { cls } from '@libs/client/utils';
import SvgSuccess from '@components/svgs/svg-success';
import { useRouter } from 'next/router';
import Navigator from '@components/navigator';
import { RootContext } from '../../../../context/root-context';
import {
  ETranslationTaskStatus,
  ITranslationTask,
  sampleTranslationTasks,
} from '../../../api/sample';
import SvgLoading from '@components/svgs/svg-loading';
import { TranslationTaskStatus } from '@components/status';
import SvgFailed from '@components/svgs/svg-failed';
import SvgCanceled from '@components/svgs/svg-canceled';
import SvgAirplane from '@components/svgs/svg-airplane';

type TabType = 'overview' | 'log' | 'parameters';
type StatusType = 'all' | 'loading' | 'success' | 'failed' | 'canceled';

const Task: NextPage = () => {
  const router = useRouter();
  const ctx = useContext(RootContext);
  const workspace = ctx?.workspace;
  const { id, taskId } = router.query;
  const [tab, setTab] = useState<TabType>('overview');
  const [status, setStatus] = useState<StatusType>('all');
  const [task, setTask] = useState<ITranslationTask>();

  useEffect(() => {
    if (taskId) {
      setTask(sampleTranslationTasks.find((t) => t.uuid === taskId));
    }
  }, [taskId]);

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
              {
                path: `/translations/${workspace?.id}`,
                text: 'Tasks',
              },
              {
                path: `/translations/${workspace?.id}/tasks/${taskId}`,
                text: `${taskId}`,
              },
            ]}
          />
          <div className="flex flex-row items-center space-x-2"></div>
        </div>
        {task?.status === ETranslationTaskStatus.SUCCESS && (
          <div className="px-7 pt-2 pb-3 flex flex-col text-green-700">
            <div className="flex flex-row items-center space-x-2 text-2xl">
              <SvgSuccess className="w-7 h-7" />
              <h1>#{taskId}</h1>
            </div>
            <div className="lowercase">{task?.status}</div>
          </div>
        )}
        {task?.status === ETranslationTaskStatus.FAILED && (
          <div className="px-7 pt-2 pb-3 flex flex-col text-red-500">
            <div className="flex flex-row items-center space-x-2 text-2xl">
              <SvgFailed className="w-7 h-7" />
              <h1>#{taskId}</h1>
            </div>
            <div className="lowercase">{task?.status}</div>
          </div>
        )}
        {task?.status === ETranslationTaskStatus.LOADING && (
          <div className="px-7 pt-2 pb-3 flex flex-col text-yellow-700">
            <div className="flex flex-row items-center space-x-2 text-2xl">
              <SvgAirplane className="w-7 h-7" />
              <h1>#{taskId}</h1>
            </div>
            <div className="lowercase">{task?.status}</div>
          </div>
        )}
        {task?.status === ETranslationTaskStatus.CANCELED && (
          <div className="px-7 pt-2 pb-3 flex flex-col text-gray-700">
            <div className="flex flex-row items-center space-x-2 text-2xl">
              <SvgCanceled className="w-7 h-7" />
              <h1>#{taskId}</h1>
            </div>
            <div className="lowercase">{task?.status}</div>
          </div>
        )}
      </div>
      <div className="p-7 divide-y space-y-2 divide-gray-300 overflow-x-scroll">
        <div className="max-w-lg flex flex-row space-x-5 items-center tracking-tight whitespace-nowrap">
          <TabItem currentTab="overview" title="Overview" />
          <TabItem currentTab="log" title="Log" />
          <TabItem currentTab="parameters" title="Parameters" />
        </div>
        <div className="pt-5 flex flex-col space-y-10">
          <div className="max-w-lg whitespace-nowrap space-y-1 text-sm">
            <div className="flex flex-row items-center">
              <div className="w-1/3 font-semibold">Input File</div>
              <div className="w-2/3">
                <span className="text-blue-800 hover:underline cursor-pointer">
                  input_7min_97ee3e_2312210000.xlsx
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="w-1/3 font-semibold">Time</div>
              <div className="w-2/3 flex flex-row space-x-2 items-center">
                <span>18 Dec 17:20 - 17:20 (12s)</span>
                <SvgLoading />
                <span>Queue time 5s</span>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="w-1/3 font-semibold">Status</div>
              <div className="w-2/3">
                <TranslationTaskStatus status={task?.status!} />
              </div>
            </div>
            {task?.status === ETranslationTaskStatus.SUCCESS && (
              <div className="flex flex-row items-center">
                <div className="w-1/3 font-semibold">Output File</div>
                <div className="w-2/3">
                  <span className="text-blue-800 hover:underline cursor-pointer">
                    output_7min_97ee3e_2312210000.xlsx
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="pt-7 pr-5 w-full flex flex-col space-y-2">
            <div className="flex flex-row h-2 text-xs text-green-700">
              {[
                { step: 1, name: 'download_input_file' },
                { step: 2, name: 'load_json' },
                { step: 3, name: 'get_sentence_list' },
                { step: 4, name: 'make_src_to_tag' },
                { step: 5, name: 'mamt_task1' },
                { step: 6, name: 'preprocessing' },
                { step: 7, name: 'google_translation' },
                { step: 8, name: 'upload_output_file' },
              ].map((s, index) => (
                <div
                  key={index}
                  className="relative w-full border-l-2 border-b-[3.2px] border-green-500 last:border-r-2 hover:border-b-8 cursor-pointer group"
                >
                  <span className="visible absolute -top-5 -right-4 text-gray-500 font-thin group-hover:invisible">
                    {s.step}/8
                  </span>
                  <span className="invisible absolute -top-5 -left-1 bg-white group-hover:visible whitespace-nowrap">
                    Step {s.step}/8: {s.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-sm">Duration: 12s</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Task;
