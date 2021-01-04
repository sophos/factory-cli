import type { CommandHandler } from '../handler';
import pipelineRevision from './pipelineRevision';
import pipeline from './pipeline';

type CreateCommandEntity = 'pipeline' | 'pipelineRevision';

const getCommandMap: Record<CreateCommandEntity, CommandHandler<any, any>> = {
  pipelineRevision,
  pipeline,
};

export default getCommandMap;
