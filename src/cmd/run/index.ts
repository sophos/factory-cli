import { CommandHandler } from '../handler';
import job from './job';
import pipeline from './pipeline';

type RunCommandEntity = 'job' | 'pipeline';

const runCommandMap: Record<RunCommandEntity, CommandHandler<any, any>> = {
  job,
  pipeline,
};

export default runCommandMap;
