import credential from './credential';
import job from './job';
import pipeline from './pipeline';
import project from './project';
import runner from './runner';
import runnerPool from './runner-pool';

const deleteCommandMap = {
  credential,
  job,
  pipeline,
  project,
  runnerPool,
  runner
};

export default deleteCommandMap;
