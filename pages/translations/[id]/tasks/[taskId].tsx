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
import SvgDownload from '@components/svgs/svg-download';

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
          tab === currentTab ? 'z-10 underline underline-offset-[13.5px] font-semibold' : '',
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
      <div className="p-7 space-y-2 overflow-x-scroll">
        <div className="max-w-lg flex flex-row space-x-5 items-center tracking-tight whitespace-nowrap">
          <TabItem currentTab="overview" title="Overview" />
          <TabItem currentTab="log" title="Log" />
          <TabItem currentTab="parameters" title="Parameters" />
        </div>
        {tab === 'overview' && (
          <div>
            <div className="max-w-xl border-t border-gray-300" />
            <div className="pt-5 flex flex-col space-y-10">
              <div className="max-w-xl whitespace-nowrap space-y-1 text-sm">
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
        )}
        {tab === 'log' && (
          <div>
            <div className="max-w-xl border-t border-gray-300" />
            <div className="pt-5 flex flex-col space-y-10">
              <div className="border-gray-300 whitespace-nowrap space-y-1 text-sm flex flex-row items-center justify-between pr-4">
                <div className="flex flex-row items-center space-x-2">
                  <select className="h-8 text-xs rounded border-gray-400">
                    <option>All Messages</option>
                    <option>Errors</option>
                    <option>Info</option>
                    <option>Debug</option>
                  </select>
                  <input
                    type="text"
                    className="rounded text-xs h-8 border-gray-400"
                    placeholder="Search in log..."
                  />
                </div>
                <div className="text-gray-400">
                  <div className="flex flex-row items-center space-x-1">
                    <SvgDownload className="h-4 w-4" />
                    <span>Download log</span>
                  </div>
                </div>
              </div>
              <div className="pr-5 w-full flex flex-col">
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
                <div className="text-gray-600 text-sm pt-5 whitespace-nowrap overflow-x-auto">
                  <div className="">17:20:09 Finalize build settings</div>
                  <div className="">
                    17:20:09 Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                    1500s, when an unknown printer took a galley of type and scrambled
                  </div>
                  <div className="">
                    17:20:09 its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to using 'Content here,
                    cont
                  </div>
                  <div className="">
                    17:20:09 There are many variations of passages of Lorem Ipsum available, but the
                    majority have suffered alteration
                  </div>
                  <div className="">
                    17:20:09 combined with a handful of model sentence structures
                  </div>
                  <div className="">
                    17:20:09 the cites of the word in classical literature, discovered the
                    undoubtable source. Lorem Ipsum
                  </div>
                  <div className="">
                    17:20:09 The standard chunk of Lorem Ipsum used since the 1500s is reproduced
                    below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                    Bonorum et Malorum" by Cicero are also reproduced
                  </div>
                  <div className="">17:20:09 Finalize build settings</div>
                  <div className="">17:20:09 Finalize build settings</div>
                  <div className="">
                    17:20:09 The generated Lorem Ipsum is therefore always free from repetition,
                    injected humour, or non-characteristic words etc.
                  </div>
                  <div className="">17:20:09 Finalize build settings</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 'parameters' && (
          <div>
            <div className="max-w-xl border-t border-gray-300" />
            <div className="pt-5 flex flex-col space-y-5">
              <div className="flex flex-col space-y-2">
                <h2 className="text-xl">Input Parameters</h2>
                <div className="divide-y space-y-1 text-sm">
                  <div className="flex flex-row items-center text-gray-400">
                    <div className="w-1/2">Name</div>
                    <div className="w-1/2">Value</div>
                  </div>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => {
                    return (
                      <div key={i} className="flex flex-row items-center py-0.5">
                        <div className="w-1/2">param{v}</div>
                        <div className="w-1/2">fofapfewofpafepawfeoa</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <h2 className="text-xl">Output Parameters</h2>
                <div className="divide-y space-y-1 text-sm">
                  <div className="flex flex-row items-center text-gray-400">
                    <div className="w-1/2">Name</div>
                    <div className="w-1/2">Value</div>
                  </div>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, i) => {
                    return (
                      <div key={i} className="flex flex-row items-center py-0.5">
                        <div className="w-1/2">param{v}</div>
                        <div className="w-1/2">fofapfewofpafepawfeoa</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Task;
