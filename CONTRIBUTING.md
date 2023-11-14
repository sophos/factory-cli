# Contributing

This section is for anyone wishing to contribute code to the Sophos Factory CLI project.

Ensure you've installed the CLI globally. See [Installation](https://github.com/sophos/factory-cli#installation).

## Clone

Clone the repository:

```sh
git clone https://github.com/sophos/factory-cli.git
```

## Build

It is assumed that all commands are executed from the root of the directory tree. In order to run the CLI application, you need to install dependencies first.

```sh
npm ci
```

To watch the source directory and rebuild the project when there are new changes, run the following command:

```sh
npm run watch
```

To execute the local build of the CLI application, use the following path to run your command:

```sh
./bin/factoryctl.js <command>
```

To produce a new production runtime (as a npm package), run the following command:

```sh
npm run build:runtime
```

To produce a new AOT build (standalone executable), run the following command:

```sh
npm run build:aot && npm run build:exe:[os]
```

... where `[os]` is one of `linux`, `macos`, `alpine` or `win` (Windows is not officially supported).

## Pre-commit

Pre-commit hooks will run the below tests and `lint:fix` when you do `git commit`. If you need to bypass the testing, use `git commit --no-verify`.

## Tests

Run unit tests with:

```sh
npm run test:unit
```

In order to run integration CLI tests locally, do the following:

1. Ensure you have executed a build with `npm run build:runtime`.
2. Pass the below environment variables prior to the `npm run` command. If you are using Mac OS, first ensure `realpath` is installed: `brew install coreutils`.

Full example for running integration tests:

```sh
# Use the development API for tests.
# FACTORY_ADDRESS is used for all 'factoryctl' sub-commands except 'organization(s)'
export FACTORY_ADDRESS="https://api.dev.factory.sophos.com/v1"
# FACTORY_AUTH_ADDRESS is used for 'factoryctl' sub-commands on organization(s)
export FACTORY_AUTH_ADDRESS="https://auth.dev.factory.sophos.com/v1"
# Set CLI executable path for tests.
export FACTORY_CLI_PATH=$(realpath ./bin/factoryctl.js)
# Sophos Factory platform authentication token for "dynamic" test suite
export FACTORY_DYNAMIC_AUTH_TOKEN="<your-factory-auth-token>"
# Sophos Factory platform authentication token for "static" test suite
export FACTORY_STATIC_AUTH_TOKEN="<your-factory-auth-token>"
# Run integration tests
npm run test:int
```

To update the test snapshots, add `-- -u` to the test command.

All requests are issued against [Sophos Factory Platform API](https://api.dev.factory.sophos.com/v1) endpoints. List of IDs of operational entities can be found in `tests/helpers/knownIds.ts`.
