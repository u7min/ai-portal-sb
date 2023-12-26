import { NextPage } from 'next';
import Layout from '@components/layout';
import { useRouter } from 'next/router';
import { cls } from '@libs/client/utils';
import SvgLanguage from '@components/svgs/svg-language';
import SvgSpeak from '@components/svgs/svg-speak';
import { ETemplateType, sampleWorkspaces } from '../api/sample';
import Navigator from '@components/navigator';

const Index: NextPage = () => {
  const router = useRouter();

  return (
    <Layout hasLeftMenu>
      <div className="flex flex-col space-y-2 border-b">
        <div className="px-7 pt-4 flex flex-row justify-between items-center">
          <Navigator paths={[]} />
          <div className="flex flex-row items-center space-x-2">
            <div
              className="border border-gray-400 py-0.5 px-3 text-sm rounded cursor-pointer hover:border-blue-500"
              onClick={() => router.push(`/workspaces/create`)}
            >
              New Workspace
            </div>
          </div>
        </div>
        <div className="px-7 pt-2 pb-3 flex flex-row items-center space-x-2 text-2xl">
          <h1>Workspaces</h1>
        </div>
      </div>
      <div className="p-7 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto">
        {sampleWorkspaces.map((w) => {
          return (
            <div
              key={w.id}
              className={cls('border hover:bg-gray-200 cursor-pointer border-gray-300')}
              onClick={() => router.push(`/workspaces/5`)}
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
    </Layout>
  );
};

export default Index;
