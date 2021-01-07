import credentials from './credentials';
import projects from './projects';
import runs from './runs';
import organizations from './organizations';
import jobs from './jobs';
import pipelines from './pipelines';
import pipelineRevisions from './pipeline-revisions';
import runners from './runners';

const listCommandMap = {
  projects,
  runs,
  organizations,
  jobs,
  'pipeline-revisions': pipelineRevisions,
  pipelines,
  runners,
  credentials
};

export default listCommandMap;
