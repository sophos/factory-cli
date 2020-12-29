import { CommandHandler } from '../handler';
import projects from './projects';
import runs from './runs';
import organizations from './organizations';
import jobs from './jobs';

type ListCommandEntity = 'projects' | 'organizations' | 'runs' | 'jobs';

const listCommandMap: Record<ListCommandEntity, CommandHandler> = {
  projects,
  runs,
  organizations,
  jobs,
};

export default listCommandMap;
