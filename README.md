# Sophos Factory CLI

The Sophos Factory command line tool (CLI) is used to interact with Sophos Factory from the command line.

Basic usage and installation is described below. [Click here for complete Sophos Factory CLI documentation.](https://docs.refactr.it/docs/using-the-cli/)

## Usage

```shell
$ factoryctl --help   
Usage: factoryctl <command> [options]

Commands:
  factoryctl run             Execute pipeline or job
  factoryctl rerun [run-id]  Reschedule pipeline run
  factoryctl list            List specified resources
  factoryctl get             Get specified resource
  factoryctl create          Create specified resource
  factoryctl delete          Delete specified resource

Options:
      --version       Show version number                                                                      [boolean]
  -v, --verbose       Print detailed output                                                                    [boolean]
      --format        Output format                                  [choices: "wide", "json", "yaml"] [default: "wide"]
      --filter        Filter output using JSONPath                                                              [string]
      --address       Address of the Sophos Factory API server
        [string] [default: FACTORY_ADDRESS environment variable if set, otherwise https://api.dev.factory.sophos.com/v1]
      --auth-address  Address of the Sophos Factory Auth API server
  [string] [default: FACTORY_AUTH_ADDRESS environment variable if set, otherwise https://auth.dev.factory.sophos.com/v1]
      --auth-token    Authentication token                   [string] [default: FACTORY_AUTH_TOKEN environment variable]
      --help          Show help                                                                                [boolean]
```

## Installation

### Binary

We provide official binaries for Linux and macOS. Get the latest version from [this page](https://github.com/sophos/factory-cli/releases/latest), and download the archive file for your operating system/architecture. Unpack the archive, and put the binary somewhere in your `$PATH` (e.g. on UNIX-y systems `/usr/local/bin`). Make sure it has execution permission granted.

### npm

To get the latest version of the CLI tool, use `npm`:

```shell
$ npm install @sophos-factory/cli -g
```

or with `yarn`:

```shell
$ yarn global add @sophos-factory/cli
```

*Global installation is required.*

### Docker

The CLI is [available on Docker Hub](https://hub.docker.com/r/refactr/cli) as well:

```shell
$ docker pull refactr/cli
```

## License
Sophos Factory CLI is [MIT](./LICENSE) licensed.

## Terms of Use

Please see [Sophos Services Agreement](https://www.sophos.com/en-us/legal/sophos-services-agreement.aspx) and [Sophos Privacy Notice](https://www.sophos.com/en-us/legal/sophos-group-privacy-notice.aspx).
