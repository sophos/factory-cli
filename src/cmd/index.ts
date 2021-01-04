import getCommandMap from './get';
import listCommandMap from './list';
import runCommandMap from './run';
import createCommandMap from './create';

const commandMap = {
  login: () => {},
  invite: () => {},

  // CRUD
  create: createCommandMap,
  get: getCommandMap,
  list: listCommandMap,
  run: runCommandMap,
};

export type TopLevelCommand = keyof typeof commandMap;

export default commandMap;
