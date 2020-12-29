import getCommandMap from './get';
import listCommandMap from './list';
import runCommandMap from './run';

const commandMap = {
  login: () => {},
  invite: () => {},

  // CRUD
  get: getCommandMap,
  list: listCommandMap,
  run: runCommandMap,
};

export type TopLevelCommand = keyof typeof commandMap;

export default commandMap;
