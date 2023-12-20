import { NextPage } from 'next';
import Layout from '@components/layout';
import { useState } from 'react';
import { cls } from '@libs/client/utils';
import SvgLanguage from '@components/svgs/svg-language';
import { useRouter } from 'next/router';
import SvgSpeak from '@components/svgs/svg-speak';
import { ETemplateType, ITemplate } from '../api/sample';

const Create: NextPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const router = useRouter();
  const templates: ITemplate[] = [
    {
      id: 1,
      name: 'Voice AI',
      type: ETemplateType.VOICE,
      description: 'You can get a voice file by entering text.',
      tags: ['TTS', 'VC'],
    },
    {
      id: 2,
      name: 'Translation',
      type: ETemplateType.TRANSLATION,
      description: 'Translation is performed using Google or GPT by applying the game glossary.',
      tags: ['Translate', 'LLM'],
    },
  ];
  return (
    <Layout>
      <div className="p-7 flex flex-col space-y-7">
        <h1 className="text-2xl">Create Workspace</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {templates.map((t, index) => {
            return (
              <div
                key={t.id}
                className={cls(
                  'border hover:bg-gray-200 cursor-pointer border-gray-300',
                  selectedTemplate === index ? 'bg-gray-200' : 'bg-white',
                )}
                onClick={() => setSelectedTemplate(index)}
              >
                <div className="p-4 flex flex-col space-y-1">
                  {t.type === ETemplateType.VOICE ? (
                    <div className="rounded-full bg-purple-500 w-6 h-6">
                      <SvgSpeak className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <div className="rounded-full bg-blue-500 w-6 h-6">
                      <SvgLanguage className="w-6 h-6 text-white" />
                    </div>
                  )}

                  <div className="flex flex-row space-x-2 items-center">
                    <h2 className="text-xl font-semibold">{t.name}</h2>
                  </div>
                  <div className="text-xs text-gray-400">{t.description}</div>
                  <div className="text-xs text-gray-400">
                    {t.tags?.map((t) => `#${t}`).join(', ')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="divide-y space-y-2 max-w-2xl">
          <div className="flex flex-row items-center">
            <div className="w-1/3 font-semibold">Creator Email</div>
            <div className="w-2/3">7min@netmarble.com</div>
          </div>
          <div className="pt-2 flex flex-col space-y-2">
            <div className="flex flex-row items-center">
              <div className="w-1/3 font-semibold">
                Name: <span className="text-red-500">*</span>
              </div>
              <div className="w-2/3">
                <input type="text" className="p-1 w-full h-7 rounded border-gray-400" />
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="w-1/3 font-semibold">Description:</div>
              <div className="w-2/3">
                <input type="text" className="p-1 w-full h-7 rounded border-gray-400" />
              </div>
            </div>
          </div>
          <div className="pt-4">
            <button
              className="bg-blue-500 rounded text-white py-2 px-5"
              onClick={() => router.push('/workspaces/233')}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
