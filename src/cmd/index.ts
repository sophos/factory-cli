import getCommandMap from './get';
import listCommandMap from './list';
import runCommandMap from './run';
import createCommandMap from './create';
import removeCommandMap from './remove';

import rerun from './rerun';

export const executableCommandsMap = {
  login: () => {},
  invite: () => {},
  rerun
};

export const commandsWithSubcommandsMap = {
  create: createCommandMap,
  get: getCommandMap,
  list: listCommandMap,
  run: runCommandMap,
  remove: removeCommandMap
};

export const mustHaveSubcommand = (
  command: string
): command is TopLevelCommandWithSubcommand =>
  ['create', 'get', 'list', 'run', 'remove'].includes(command);

export type TopLevelExecutableCommand = 'login' | 'invite' | 'rerun';
export type TopLevelCommandWithSubcommand =
  | 'create'
  | 'get'
  | 'list'
  | 'run'
  | 'remove';
export type TopLevelCommand =
  | TopLevelExecutableCommand
  | TopLevelCommandWithSubcommand;
