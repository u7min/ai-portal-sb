import SvgLanguage from '@components/svgs/svg-language';
import SvgSpeak from '@components/svgs/svg-speak';
import { ETemplateType } from '../pages/api/sample';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Fragment } from 'react';

interface NavigatorProps {
  paths: {
    path: string;
    text?: string;
    type?: ETemplateType;
  }[];
}
const Navigator: NextPage<NavigatorProps> = ({ paths }) => {
  const router = useRouter();
  return (
    <div className="text-gray-500 flex flex-row items-center space-x-1">
      {paths?.map((path, index) => (
        <Fragment key={index}>
          <div
            className="cursor-pointer hover:underline flex flex-row items-center space-x-1"
            onClick={() => router.push(path.path)}
          >
            {path.type === ETemplateType.TRANSLATION ? (
              <SvgLanguage className="w-4 h-4 text-blue-500" />
            ) : path.type === ETemplateType.VOICE ? (
              <SvgSpeak className="w-4 h-4 text-purple-500" />
            ) : (
              <span></span>
            )}
            <span>{path.text}</span>
          </div>
          <div className="last:hidden">/</div>
        </Fragment>
      ))}
    </div>
  );
};

export default Navigator;
