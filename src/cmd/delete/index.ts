import credential from './credential';
import job from './job';
import pipeline from './pipeline';
import project from './project';
import runner from './runner-manager';

const deleteCommandMap = {
  credential,
  job,
  pipeline,
  project,
  runner
};

export default deleteCommandMap;
