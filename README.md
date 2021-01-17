# Refactr CLI

The Refactr command line tool is used to interact with the Refactr Platform API from the command line.

For instance, CLI can be used to integrate with other CI/CD platforms, like GitLab Pipelines, etc.

**NOTE**: version `1.x` has been redone from scratch is not compatible with `0.12.x`.

## Installation

### Binary
Starting from version `1.0.0` the CLI is primarily distributed via binary builds.
Currently, we provide official binaries for Linux, Windows and macOS. Get the
latest version from [this page](https://github.com/refactr/refactr-cli/releases/latest),
and download the archive file for your operating system/architecture.
Unpack the archive, and put the binary somewhere in your `$PATH` (on UNIX-y systems, e.g. `/usr/local/bin`).
Make sure it has execution permission turned on.

### npm

To get the latest version of the CLI tool, use `npm`:

```shell
$ npm install @refactr/cli -g
```

or with `yarn`:
```shell
$ yarn global add @refactr/cli
```

### Docker

The CLI [available on Docker Hub](https://hub.docker.com/r/refactr/cli) as well:

```shell
$ docker pull refactr/cli
```

## License
Refactr CLI is [MIT](./LICENSE) licensed.
