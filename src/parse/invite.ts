import Yargs from 'yargs';

export default (yargs: Yargs.Argv) =>
  yargs.command('invite', '', (yargs) =>
    yargs
      .command('user', 'Invite user to provide the organization')
      .usage(
        'Usage: $0 user --organization-id <organization-id> --email <email-address>'
      )
      .option('organization-id', {
        describe: 'Organization to invite the user to',
        type: 'string',
        demandOption: true,
        requiresArg: true
      })
      .option('email', {
        describe: 'Email address to invite user to the organization by',
        type: 'string',
        demandOption: true,
        requiresArg: true
      })
      .demandCommand(1, 'Command must be specified.')
      .strict()
  );
