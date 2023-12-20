import SvgSuccess from '@components/svgs/svg-success';
import { NextPage } from 'next';
import { ETranslationTaskStatus } from '../pages/api/sample';
import SvgFailed from '@components/svgs/svg-failed';
import SvgAirplane from '@components/svgs/svg-airplane';

interface TranslationTaskStatusProps {
  status: ETranslationTaskStatus;
}

export const TranslationTaskStatus: NextPage<TranslationTaskStatusProps> = ({ status }) => {
  return status === ETranslationTaskStatus.SUCCESS ? (
    <div className="flex flex-row space-x-0.5 text-green-600">
      <SvgSuccess />
      <span className="lowercase">{status}</span>
    </div>
  ) : status === ETranslationTaskStatus.FAILED ? (
    <div className="flex flex-row space-x-0.5 text-red-500">
      <SvgFailed />
      <span className="lowercase">{status}</span>
    </div>
  ) : (
    <div className="flex flex-row space-x-0.5 text-yellow-600">
      <SvgAirplane />
      <span className="lowercase">{status}</span>
    </div>
  );
};
