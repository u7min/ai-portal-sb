import { NextPage } from 'next';
import Layout from '@components/layout';
import SvgPlay from '@components/svgs/svg-play';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { cls } from '@libs/client/utils';
import Navigator from '@components/navigator';
import { ETemplateType } from '../../../api/sample';
import { RootContext } from '../../../../context/root-context';
import SvgX from '@components/svgs/svg-x';

type StepProcess = 'fileUpload' | 'models' | 'language' | 'applyGlossary';
const Create: NextPage = () => {
  const router = useRouter();
  const ctx = useContext(RootContext);
  const workspace = ctx?.workspace;
  const { id } = router.query;
  const [step, setStep] = useState<StepProcess>('fileUpload');
  const [selectedTargetLanguages, setSelectedTargetLanguages] = useState<string[]>([]);
  const targetLanguages = ['Spanish', 'French', 'German', 'Italian'];
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Spanish');

  const TargetLanguageBadge = ({ language }: { language: string }) => {
    return (
      <div className="flex flex-row space-x-0.5 items-center px-1 py-0.5 bg-blue-500 w-fit rounded text-white">
        <span>{language}</span>
        <span
          className="cursor-pointer hover:text-red-200"
          onClick={() => {
            setSelectedTargetLanguages((prev) => [...prev.filter((p) => p !== language)]);
          }}
        >
          <SvgX className="w-3 h-3" />
        </span>
      </div>
    );
  };

  const onClickAddTargetLanguage = () => {
    if (selectedLanguage) {
      if (!selectedTargetLanguages.find((language) => language === selectedLanguage)) {
        setSelectedTargetLanguages((prev) => [...prev, selectedLanguage]);
      }
    }
  };

  const onSelectTargetLanguage = (e: any) => {
    e.preventDefault();
    setSelectedLanguage(e.target.value);
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-2 border-b">
        <div className="px-7 pt-4 flex flex-row justify-between items-center">
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
          <div className="flex flex-row items-center space-x-2 h-[26px]"></div>
        </div>
        <div className="px-7 pt-2 pb-3 flex flex-row items-center space-x-2 text-2xl">
          <SvgPlay className="rounded-full bg-blue-500 w-6 h-6 text-white" />
          <h1>Translation</h1>
        </div>
      </div>
      <div className="flex flex-row h-full">
        <div className="w-1/4 bg-gray-100 h-full border-r">
          <div className="flex flex-col text-blue-900 whitespace-nowrap overflow-x-hidden text-[11pt]">
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
            <div className="p-7 flex flex-col space-y-5 max-w-2xl">
              <div>
                <div className="pb-5">
                  <h2 className="text-lg font-semibold">File upload requirements</h2>
                  <span className="text-gray-400 text-xs">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book.
                  </span>
                </div>
                <div className="flex flex-row items-center">
                  <div className="w-1/3 font-semibold">
                    Source File: <span className="text-red-500">*</span>
                  </div>
                  <div className="w-2/3">
                    <label className="w-full cursor-pointer text-gray-500 hover:border-yellow-500 hover:text-yellow-500 flex items-center justify-center border border-dashed border-gray-300 h-48 rounded-md">
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
                  className="border rounded py-1 px-5 border-gray-400 hover:border-blue-500 text-sm"
                  onClick={() => setStep('models')}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 'models' && (
            <div className="p-7 flex flex-col space-y-5 max-w-2xl">
              <div>
                <div className="flex flex-row items-center">
                  <div className="w-1/3 font-semibold">
                    Translation Model for Game: <span className="text-red-500">*</span>
                  </div>
                  <div className="w-2/3">
                    <select className="rounded h-10 text-sm w-full">
                      <option>The King of Fighters</option>
                      <option>Seven Nights 2</option>
                      <option>A3</option>
                      <option>Hype Squared</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <button
                  className="border rounded py-1 px-5 border-gray-400 hover:border-blue-500 text-sm"
                  onClick={() => setStep('language')}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 'language' && (
            <div className="p-7 flex flex-col space-y-5 max-w-2xl">
              <div className="divide-y">
                <div className="flex flex-row items-center px-1 py-2">
                  <div className="w-1/3 font-semibold">
                    Source Language: <span className="text-red-500">*</span>
                  </div>
                  <div className="w-2/3">
                    <select className="rounded h-10 text-sm w-full">
                      <option>English</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row items-center px-1 py-2">
                  <div className="w-1/3 font-semibold">
                    Target Languages: <span className="text-red-500">*</span>
                  </div>
                  <div className="w-2/3">
                    <div className="flex flex-row items-center">
                      <select
                        className="rounded-l h-10 text-sm w-full"
                        onChange={onSelectTargetLanguage}
                      >
                        {targetLanguages.map((language, i) => (
                          <option key={i} value={language}>
                            {language}
                          </option>
                        ))}
                      </select>
                      <div
                        className="border-r border-t border-b border-gray-500 h-10 text-sm pt-2 rounded-r w-14 text-center cursor-pointer bg-gray-200 hover:border-blue-500 hover:bg-gray-300"
                        onClick={onClickAddTargetLanguage}
                      >
                        Add
                      </div>
                    </div>
                    <div
                      className={cls(
                        `py-2 text-xs flex flex-row space-x-2`,
                        !selectedTargetLanguages.length ? 'hidden' : '',
                      )}
                    >
                      {selectedTargetLanguages.map((language, i) => {
                        return <TargetLanguageBadge language={language} key={i} />;
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <button
                  className="border rounded py-1 px-5 border-gray-400 hover:border-blue-500 text-sm"
                  onClick={() => setStep('applyGlossary')}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 'applyGlossary' && (
            <div className="p-7 flex flex-col space-y-5 max-w-2xl">
              <div>
                <div className="flex flex-row items-center">
                  <div className="w-1/3 font-semibold">
                    Method of apply glossaries: <span className="text-red-500">*</span>
                  </div>
                  <div className="w-2/3">
                    <select className="rounded h-10 text-sm w-full">
                      <option>Magellan</option>
                      <option>Google</option>
                      <option>No Apply</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <button
                  className="border rounded py-1 px-5 bg-blue-500 text-white hover:bg-blue-600 text-sm"
                  onClick={() =>
                    router.push('/translations/3/tasks/97ee3e4404b8f5883349a1d26bacd3d0')
                  }
                >
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
