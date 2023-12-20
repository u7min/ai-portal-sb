import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Task: NextPage = () => {
  const router = useRouter();
  console.log(router);
  return <div>task</div>;
};

export default Task;
