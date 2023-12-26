import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RootIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);
  return <div>Loading...</div>;
};

export default RootIndex;
