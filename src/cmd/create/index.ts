import credential from './credential';
import job from './job';
import pipeline from './pipeline';
import pipelineRevision from './pipeline-revision';
import project from './project';

const getCommandMap = {
  credential,
  job,
  'pipeline-revision': pipelineRevision,
  pipeline,
  project
};

export default getCommandMap;
