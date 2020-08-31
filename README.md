# Refactr CLI

The Refactr command line tool is used to interact with the Refactr Platform from the command line.

For instance, CLI can be used to integrate with other CI/CD platforms, like GitLab Pipelines, etc.

**Note:** Some API methods are not implemented by this tool.


## Installation

### npm

To get latest version of the CLI tool, use `npm`:

```
npm install @refactr/cli -g
```

### Docker

The CLI can also be run as a Docker container (available on DockerHub):

```
docker pull refactr/cli
```

### Usage

If `refactr-cli` is installed globally, you should be able to run it directly from a terminal:
```
$ refactr-cli <command>
```

When running with Docker, it can be executed using:
```
$ docker run refactr-cli <command>
```

### API

#### Non-API commands

Every command has a following options:
```
-h, --help              display help for command
```

The `--help` option is equivalent to executing `refactr-cli help <command>`.

##### `help`
The `help` command will provide information about the particular `command`,
for example:

```
$ refactr-cli help job
Usage: refactr-cli job [options] [command]

job actions

Options:
  -p, --project <id>  project id
  -h, --help          display help for command

Commands:
  list                list available jobs
  run [options] <id>  create a new run for given job
  help [command]      display help for command
```

### General API commands
Each API command accepts `--access-token` which is used to set the authentication token used to access API. If `--access-token` is omitted, the token will default to the `REFACTR_AUTH_TOKEN` environment variable if it exists. The value must be a JWT access token obtained from the Tokens page at https://app.refactr.it/user/tokens.

An optional `--api-url` can also be provided to set endpoint to the Refactr API server. If omitted, defaults to `https://api.refactr.it/v1`.

### Project commands

#### `project list`
List available projects per given access token.

Example
```
$ refactr-cli project list
```

##### `--organization <id>`
An optional organization ID can be provided to limit projects populated to only projects available under the organization.

### Job commands
All job sub-commands requires `-p, --project` to be set to appropriated project ID. To obtain job `id` use `project list` command.

#### `job list`
List available jobs under the given project.

Example
```
$ refactr-cli job list --project <project-id>
```

#### `job run [options] <id>`
Creates a new job run with given `id`. To obtain valid job `id` use `job list` command.

Example
```
refactr-cli job run <run-id> --project <project-id> --wait
```

##### `--wait`
If set blocks the CLI exit until job run is completed. Any events that are produced during the run will be logged to stdout, unless `--suppress-events` is set. If the run produce any outputs they will be logged to the stdout. Defaults to disabled.

##### `--suppress-outputs`
Sets suppress outputs flag per job run, if set run outputs will be hidden. Defaults to disabled.

##### `--suppress-variables`
Sets suppress variables flag per job run, if set then variables will be hidden per given run. Defaults to disabled.


##### `--suppress-events`
Sets suppress events flag per job run, if set then run events will be omitted. Defaults to disabled.

##### `--variables`
The `variables` flag is used to set custom execution variables for job run. The value must a valid JSON object string e.g. `'{ "myvar": "val" }'`.
