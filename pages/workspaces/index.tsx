import { NextPage } from 'next';
import Layout from '@components/layout';
import { useRouter } from 'next/router';
import { cls } from '@libs/client/utils';
import SvgMusic from '@components/svgs/svg-music';
import SvgLanguage from '@components/svgs/svg-language';

const Index: NextPage = () => {
  const router = useRouter();
  const workspaces = [
    {
      name: 'test-ai-workspace-1',
      group: 'Voice AI',
      applicationType: 'TTS',
      tags: ['tag1', 'tag2'],
    },
    {
      name: 'test-ai-workspace-2',
      group: 'Voice AI',
      applicationType: 'TTS',
      tags: ['tag1'],
    },
    {
      name: 'test-ai-workspace-3',
      group: 'Voice AI',
      applicationType: 'VC',
      tags: ['tag4'],
    },
    {
      name: 'test-ai-workspace-4',
      group: 'Mamt',
      applicationType: 'Translation',
      tags: ['tag1'],
    },
    {
      name: 'test-ai-workspace-5',
      group: 'Mamt',
      applicationType: 'Translation',
      tags: ['tag8'],
    },
  ];
  return (
    <Layout hasLeftMenu>
      <div className="p-7 flex flex-col space-y-3">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center space-x-1 text-2xl">Workspaces</div>
          <div>
            <button
              onClick={() => router.push('/workspaces/create')}
              className="border border-gray-400 rounded px-2 hover:border-blue-500 hidden sm:block"
            >
              New Workspace
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {workspaces.map((w, index) => {
            return (
              <div
                key={index}
                className={cls('border hover:bg-gray-200 cursor-pointer border-gray-300')}
                onClick={() => router.push('/workspaces/23')}
              >
                <div className="p-4 flex flex-col space-y-0.5">
                  {w.group === 'Voice AI' ? (
                    <div className="rounded-full bg-purple-500 w-7 h-7">
                      <SvgMusic className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <div className="rounded-full bg-blue-500 w-7 h-7">
                      <SvgLanguage className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold">{w.name}</h2>
                  </div>
                  <div className="flex flex-row space-x-2 items-center">
                    <h2 className="text-sm text-gray-400">{w.applicationType}</h2>
                  </div>
                  <div className="text-xs text-gray-400">
                    {w.tags.map((w) => `#${w}`).join(' ')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
