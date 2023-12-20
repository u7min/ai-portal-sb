export interface IWorkspace {
  id: number;
  name: string;
  userId: number;
  description?: string;
  templateId: number;
  template: ITemplate;
}

export enum ETemplateType {
  VOICE = 'VOICE',
  TRANSLATION = 'TRANSLATION',
}

export enum ETranslationTaskStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
}

export interface ITranslationTask {
  id: number;
  workspaceId: number;
  game: string;
  uuid?: string;
  status: ETranslationTaskStatus;
  sourceLan: string;
  targetLan: string[];
  applyMethod: string;
  createdAt: string;
  duration: number;
}

export interface ITemplate {
  id: number;
  name: string;
  description?: string;
  type: ETemplateType;
  tags?: string[];
}

export const sampleTemplates: ITemplate[] = [
  {
    id: 1,
    name: 'Voice Conversion',
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

export const sampleWorkspaces: IWorkspace[] = [
  {
    id: 1,
    name: 'test-workspace-a',
    userId: 1,
    templateId: 1,
    template: sampleTemplates[0],
    description: 'My first workspace',
  },
  {
    id: 2,
    name: 'test-workspace-b',
    userId: 1,
    templateId: 1,
    template: sampleTemplates[0],
    description: 'My first workspace',
  },
  {
    id: 3,
    name: 'test-workspace-c',
    userId: 1,
    templateId: 2,
    template: sampleTemplates[1],
    description: 'My first workspace',
  },
  {
    id: 4,
    name: 'test-workspace-d',
    userId: 1,
    templateId: 1,
    template: sampleTemplates[0],
    description: 'My first workspace',
  },
  {
    id: 5,
    name: 'test-workspace-e',
    userId: 1,
    templateId: 2,
    template: sampleTemplates[1],
    description: 'My first workspace',
  },
];

export const sampleTranslationTasks: ITranslationTask[] = [
  {
    id: 1,
    workspaceId: 3,
    game: 'SevenNights',
    sourceLan: 'English',
    targetLan: ['Russian', 'Spanish'],
    applyMethod: 'Google',
    status: ETranslationTaskStatus.LOADING,
    uuid: '97ee3e4404b8f5883349a1d26bacd3d0',
    createdAt: '15 Dec 23 12:23',
    duration: 23,
  },
  {
    id: 2,
    workspaceId: 3,
    game: 'SevenNights',
    sourceLan: 'English',
    targetLan: ['Russian', 'Spanish'],
    applyMethod: 'Google',
    status: ETranslationTaskStatus.SUCCESS,
    uuid: '5c79d525d0730a3255a4ed19c725bc39',
    createdAt: '15 Dec 23 12:23',
    duration: 11,
  },
  {
    id: 3,
    workspaceId: 3,
    game: 'SevenNights',
    sourceLan: 'English',
    targetLan: ['Russian'],
    applyMethod: 'Google',
    status: ETranslationTaskStatus.FAILED,
    uuid: '9c783f72c0156bfe96f892d6a4d96374',
    createdAt: '15 Dec 23 12:23',
    duration: 0,
  },
  {
    id: 4,
    workspaceId: 3,
    game: 'SevenNights',
    sourceLan: 'English',
    targetLan: ['Japanese'],
    applyMethod: 'Magellan',
    status: ETranslationTaskStatus.SUCCESS,
    uuid: 'f751e4d2665a0d3e6e82ec7828fece78',
    createdAt: '15 Dec 23 12:23',
    duration: 23,
  },
];
