import { CommandHandler } from '../handler';
import projects from './projects';
import runs from './runs';
import organizations from './organizations';
import jobs from './jobs';
import pipelines from './pipelines';

type ListCommandEntity =
  | 'projects'
  | 'organizations'
  | 'runs'
  | 'jobs'
  | 'pipelines';

const listCommandMap: Record<ListCommandEntity, CommandHandler<any, any>> = {
  projects,
  runs,
  organizations,
  jobs,
  pipelines,
};

export default listCommandMap;
