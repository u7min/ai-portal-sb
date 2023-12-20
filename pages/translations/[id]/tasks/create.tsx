import { NextPage } from 'next';
import Layout from '@components/layout';
import SvgPlay from '@components/svgs/svg-play';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { cls } from '@libs/client/utils';
import Navigator from '@components/navigator';
import { ETemplateType } from '../../../api/sample';
import { RootContext } from '../../../../context/root-context';

type StepProcess = 'fileUpload' | 'models' | 'language' | 'applyGlossary';
const Create: NextPage = () => {
  const router = useRouter();
  const ctx = useContext(RootContext);
  const workspace = ctx?.workspace;
  const { id } = router.query;
  const [step, setStep] = useState<StepProcess>('fileUpload');
  return (
    <Layout>
      <div className="flex flex-col space-y-3 border-b">
        <div className="px-7 pt-3 flex flex-row justify-between items-center">
          <Navigator
            paths={[
              { path: '/workspaces', text: 'Workspaces' },
              {
                path: `/translations/${id}`,
                text: workspace?.name,
                type: ETemplateType.TRANSLATION,
              },
              { path: `/translations/${id}/tasks/create`, text: 'Translation' },
            ]}
          />
          <div className="flex flex-row items-center space-x-2">
            <div className="py-0.5 px-3 text-sm rounded border cursor-pointer hover:border-blue-500">
              Action
            </div>
          </div>
        </div>
        <div className="px-7 pt-2 pb-3 flex flex-row items-center space-x-2 text-2xl">
          <SvgPlay className="rounded-full bg-blue-500 w-6 h-6 text-white" />
          <h1>Translation</h1>
        </div>
      </div>
      <div className="flex flex-row h-full">
        <div className="w-1/4 bg-gray-100 h-full border-r">
          <div className="flex flex-col text-blue-900 whitespace-nowrap overflow-x-hidden">
            <div className="">&nbsp;</div>
            <div
              className={cls(
                'py-0.5 hover:bg-blue-100',
                step === 'fileUpload' ? 'bg-blue-100 font-semibold text-gray-900' : '',
              )}
              onClick={() => setStep('fileUpload')}
            >
              <span className="px-7 hover:underline cursor-pointer">File Upload</span>
            </div>
            <div
              className={cls(
                'py-0.5 hover:bg-blue-100',
                step === 'models' ? 'bg-blue-100 font-semibold text-gray-900' : '',
              )}
              onClick={() => setStep('models')}
            >
              <span className="px-7 hover:underline cursor-pointer">Models</span>
            </div>
            <div
              className={cls(
                'py-0.5 hover:bg-blue-100',
                step === 'language' ? 'bg-blue-100 font-semibold text-gray-900' : '',
              )}
              onClick={() => setStep('language')}
            >
              <span className="px-7 hover:underline cursor-pointer">Languages</span>
            </div>
            <div
              className={cls(
                'py-0.5 hover:bg-blue-100',
                step === 'applyGlossary' ? 'bg-blue-100 font-semibold text-gray-900' : '',
              )}
              onClick={() => setStep('applyGlossary')}
            >
              <span className="px-7 hover:underline cursor-pointer">Apply Glossary</span>
            </div>
          </div>
        </div>
        <div className="w-3/4">
          {step === 'fileUpload' && (
            <div className="p-7 flex flex-col space-y-3 max-w-2xl">
              <div>
                <div className="flex flex-row items-center">
                  <div className="w-1/3 font-semibold">
                    Source File: <span className="text-red-500">*</span>
                  </div>
                  <div className="w-2/3">
                    <label className="w-full cursor-pointer text-gray-500 hover:border-yellow-500 hover:text-yellow-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
                      <svg
                        className="h-12 w-12"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <input className="hidden" type="file" />
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <button
                  className="border rounded py-1 px-5 border-gray-400 hover:border-blue-500"
                  onClick={() => setStep('models')}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 'models' && (
            <div className="p-7 flex flex-col space-y-3 max-w-2xl">
              <div>
                <div className="flex flex-row items-center">
                  <div className="w-1/3 font-semibold">
                    Source File: <span className="text-red-500">*</span>
                  </div>
                  <div className="w-2/3">X</div>
                </div>
              </div>
              <hr />
              <div>
                <button
                  className="border rounded py-1 px-5 border-gray-400 hover:border-blue-500"
                  onClick={() => setStep('language')}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 'language' && (
            <div className="p-7 flex flex-col space-y-3 max-w-2xl">
              <div>
                <div className="flex flex-row items-center">
                  <div className="w-1/3 font-semibold">
                    Source File: <span className="text-red-500">*</span>
                  </div>
                  <div className="w-2/3">X</div>
                </div>
              </div>
              <hr />
              <div>
                <button
                  className="border rounded py-1 px-5 border-gray-400 hover:border-blue-500"
                  onClick={() => setStep('applyGlossary')}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 'applyGlossary' && (
            <div className="p-7 flex flex-col space-y-3 max-w-2xl">
              <div>
                <div className="flex flex-row items-center">
                  <div className="w-1/3 font-semibold">
                    Source File: <span className="text-red-500">*</span>
                  </div>
                  <div className="w-2/3">X</div>
                </div>
              </div>
              <hr />
              <div>
                <button className="border rounded py-1 px-5 bg-blue-500 text-white hover:bg-blue-600">
                  Run
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Create;
