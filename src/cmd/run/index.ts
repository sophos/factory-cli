import { CommandHandler } from '../handler';
import job from './job';
import pipelineRevision from './pipeline-revision';

type RunCommandEntity = 'job' | 'pipeline-revision';

const runCommandMap: Record<RunCommandEntity, CommandHandler<any, any>> = {
  job,
  'pipeline-revision': pipelineRevision,
};

export default runCommandMap;
