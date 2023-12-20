import { NextPage } from 'next';
import Layout from '@components/layout';
import { useRouter } from 'next/router';
import { cls } from '@libs/client/utils';
import SvgLanguage from '@components/svgs/svg-language';
import SvgSpeak from '@components/svgs/svg-speak';
import { ETemplateType, sampleWorkspaces } from '../api/sample';

const Index: NextPage = () => {
  const router = useRouter();

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
          {sampleWorkspaces.map((w) => {
            return (
              <div
                key={w.id}
                className={cls('border hover:bg-gray-200 cursor-pointer border-gray-300')}
                onClick={() => router.push(`/workspaces/${w.id}`)}
              >
                <div className="p-4 flex flex-col space-y-0.5">
                  <div className="flex flex-row text-lg font-semibold items-center space-x-2">
                    <div>
                      {w.template.type === ETemplateType.TRANSLATION ? (
                        <SvgLanguage className="rounded-full bg-blue-500 w-6 h-6 text-white" />
                      ) : (
                        <SvgSpeak className="rounded-full bg-purple-500 w-6 h-6 text-white" />
                      )}
                    </div>
                    <h2 className="whitespace-nowrap overflow-x-hidden">{w.name}</h2>
                  </div>
                  <div className="flex flex-row space-x-2 items-center">
                    <div className="text-sm flex flex-row space-x-1">
                      <h2 className="text-gray-400">{w.description}</h2>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {w.template?.tags?.map((w) => `#${w}`).join(' ')}
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
