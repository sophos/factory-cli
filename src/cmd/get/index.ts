import type { CommandHandler } from '../handler';
import organization from './organization';
import project from './project';
import run from './run';

type GetCommandEntity = 'project' | 'organization' | 'run';

const getCommandMap: Record<GetCommandEntity, CommandHandler<any, any>> = {
  project,
  organization,
  run,
};

export default getCommandMap;
