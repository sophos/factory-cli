import Yargs from 'yargs';

export default (yargs: Yargs.Argv) =>
  yargs.command('login', 'Authenticates against the API and stores the token');
