import pipelineRevision from './pipeline-revision';
import pipeline from './pipeline';
import project from './project';
import credential from './credential';

const getCommandMap = {
  credential,
  'pipeline-revision': pipelineRevision,
  pipeline,
  project
};

export default getCommandMap;
