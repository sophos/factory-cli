import getCommandMap from './get';
import listCommandMap from './list';
import runCommandMap from './run';
import createCommandMap from './create';
import deleteCommandMap from './delete';

import rerun from './rerun';
import { CommandHandler } from './handler';

export const executableCommandsMap = {
  rerun
};

export const commandsWithSubcommandsMap: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, CommandHandler<any, any>>
> = {
  create: createCommandMap,
  get: getCommandMap,
  list: listCommandMap,
  run: runCommandMap,
  delete: deleteCommandMap
};

export const mustHaveSubcommand = (
  command: string
): command is TopLevelCommandWithSubcommand =>
  ['create', 'get', 'list', 'run', 'delete'].includes(command);

export type TopLevelExecutableCommand = 'rerun';
export type TopLevelCommandWithSubcommand =
  | 'create'
  | 'get'
  | 'list'
  | 'run'
  | 'delete';
export type TopLevelCommand =
  | TopLevelExecutableCommand
  | TopLevelCommandWithSubcommand;
