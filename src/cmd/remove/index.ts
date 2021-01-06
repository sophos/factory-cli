import type { CommandHandler } from '../handler';
import job from './job';
import pipeline from './pipeline';
import project from './project';

type CreateCommandEntity = 'job' | 'pipeline' | 'project';

const removeCommandMap: Record<
  CreateCommandEntity,
  CommandHandler<any, any>
> = {
  job,
  pipeline,
  project
};

export default removeCommandMap;
