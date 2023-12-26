import { NextPage } from 'next';
import Layout from '@components/layout';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ETemplateType, sampleWorkspaces } from '../api/sample';
import { RootContext } from '../../context/root-context';

const Workspace: NextPage = () => {
  const router = useRouter();
  const ctx = useContext(RootContext);
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    const workspace = sampleWorkspaces.find((w) => w.id === +id);
    if (workspace) {
      ctx?.actions.setWorkspace(workspace);

      if (workspace?.template.type === ETemplateType.VOICE) {
        router.replace(`/voices/${workspace?.id}`);
      } else {
        router.replace(`/translations/${workspace?.id}`);
      }
    }
  }, [ctx?.actions, id, router]);

  return (
    <Layout>
      <div>Loading...</div>
    </Layout>
  );
};

export default Workspace;
