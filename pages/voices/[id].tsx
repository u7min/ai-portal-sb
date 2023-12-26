import { NextPage } from 'next';
import Layout from '@components/layout';
import SvgStar from '@components/svgs/svg-star';
import SvgLanguage from '@components/svgs/svg-language';
import { useEffect, useState } from 'react';
import { cls } from '@libs/client/utils';
import SvgCanceled from '@components/svgs/svg-canceled';
import SvgFailed from '@components/svgs/svg-failed';
import SvgSuccess from '@components/svgs/svg-success';
import SvgLoading from '@components/svgs/svg-loading';
import { useRouter } from 'next/router';
import SvgPlay from '@components/svgs/svg-play';
import { IWorkspace, sampleWorkspaces } from '../api/sample';
import SvgSpeak from '@components/svgs/svg-speak';
import Navigator from '@components/navigator';

type TabType = 'overview' | 'tasks' | 'statistics' | 'glossaries' | 'system-glossaries';
type StatusType = 'all' | 'loading' | 'success' | 'failed' | 'canceled';

const Voice: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tab, setTab] = useState<TabType>('overview');
  const [status, setStatus] = useState<StatusType>('all');
  const [workspace, setWorkspace] = useState<IWorkspace>();

  useEffect(() => {
    if (!id) return;
    const workspace = sampleWorkspaces.find((w) => w.id === +id);
    if (workspace) {
      setWorkspace(workspace);
    }
  }, [id]);
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
      <div className="flex flex-col space-y-2 border-b">
        <div className="px-7 pt-4 flex flex-row justify-between items-center">
          <Navigator paths={[]} />
          <div className="flex flex-row items-center space-x-2"></div>
        </div>
        <div className="px-7 pt-2 pb-3 flex flex-row items-center space-x-2 text-2xl">
          <SvgSpeak className="rounded-full bg-purple-500 w-6 h-6 text-white" />
          <h1>{workspace?.name}</h1>
        </div>
      </div>
      <div className="p-7 divide-y space-y-2 divide-gray-300 overflow-x-scroll">...</div>
    </Layout>
  );
};

export default Voice;
