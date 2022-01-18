# Contributing

This section is for anyone wishing to contribute code to the Sophos Factory CLI project.

Ensure you've installed the CLI globally. See [Installation](https://github.com/sophos-factory/cli#installation).

## Clone

Clone the repository: 

```sh
git clone https://github.com/sophos-factory/cli.git
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
./bin/refactrctl.js <command>
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

In order to run end-to-end CLI tests locally, do the following:

1. Ensure you have executed a build.
2. Pass the below environment variables prior to the `npm run` command. If you are using Mac OS, first ensure `realpath` is installed: `brew install coreutils`.

Full example for running end-to-end tests:

```sh
# Use the development API for tests.
FACTORY_ADDRESS="https://api.main.refactr.it/v1" \
# Set CLI executable path for tests.
FACTORY_CLI_PATH=$(realpath ./bin/refactrctl.js) \
# Sophos Factory platform authentication token for "dynamic" test suite
FACTORY_DYNAMIC_AUTH_TOKEN="<your-factory-auth-token>" \
# Sophos Factory platform authentication token for "static" test suite
FACTORY_STATIC_AUTH_TOKEN="<your-factory-auth-token>" \
npm run test:e2e -- -u
 ```

End-to-end tests are split into two types: static and dynamic.

Dynamic tests cover create, delete, and update operations.

Static tests are for verifying get and list operations. They require data on the server to be unchanged for the whole lifecycle. If you made any changes to corresponding entities on the development server, make sure to update tests first.

All requests are issued against [Sophos Factory Platform API](https://api.main.refactr.it/v1) endpoints. List of IDs of operational entities can be found in `e2e/helpers/knownIds.js`.
