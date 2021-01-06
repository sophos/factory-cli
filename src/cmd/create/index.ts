import type { CommandHandler } from '../handler';
import pipelineRevision from './pipelineRevision';
import pipeline from './pipeline';
import project from './project';

type CreateCommandEntity = 'pipeline' | 'pipeline-revision' | 'project';

const getCommandMap: Record<CreateCommandEntity, CommandHandler<any, any>> = {
  'pipeline-revision': pipelineRevision,
  pipeline,
  project
};

export default getCommandMap;
