import credential from './credential';
import job from './job';
import organization from './organization';
import pipeline from './pipeline';
import pipelineRevision from './pipeline-revision';
import project from './project';
import run from './run';
import runner from './runner';
import runnerPool from './runner-pool';

const getCommandMap = {
  credential,
  job,
  organization,
  project,
  pipeline,
  'pipeline-revision': pipelineRevision,
  run,
  runner,
  'runner-pool': runnerPool
};

export default getCommandMap;
