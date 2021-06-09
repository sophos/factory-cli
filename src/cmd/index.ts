import getCommandMap from './get';
import listCommandMap from './list';
import runCommandMap from './run';
import createCommandMap from './create';
import deleteCommandMap from './delete';
import waitRun from './wait-run';

import rerun from './rerun';
import { CommandHandler } from './handler';

export const executableCommandsMap: Record<
  TopLevelExecutableCommand,
  CommandHandler<any, any>
> = {
  rerun,
  'wait-run': waitRun
};

export const commandsWithSubcommandsMap: Record<
  TopLevelCommandWithSubcommand,
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

export type TopLevelExecutableCommand = 'rerun' | 'wait-run';
export type TopLevelCommandWithSubcommand =
  | 'create'
  | 'get'
  | 'list'
  | 'run'
  | 'delete';
export type TopLevelCommand =
  | TopLevelExecutableCommand
  | TopLevelCommandWithSubcommand;
