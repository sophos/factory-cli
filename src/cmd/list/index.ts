import credentials from './credentials';
import projects from './projects';
import runs from './runs';
import organizations from './organizations';
import jobs from './jobs';
import pipelines from './pipelines';
import pipelineRevisions from './pipeline-revisions';
import runnerManagers from './runner-managers';

const listCommandMap = {
  projects,
  runs,
  organizations,
  jobs,
  'pipeline-revisions': pipelineRevisions,
  pipelines,
  'runner-managers': runnerManagers,
  credentials
};

export default listCommandMap;
