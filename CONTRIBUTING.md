# Contributing

This section is for anyone wishing to contribute code to Refactr CLI project.

## Clone

Clone the repository: 

```sh
git clone https://github.com/refactr/refactr-cli.git
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

## Tests

Run unit tests with:

```sh
npm run test:unit
```

In order to run end-to-end CLI tests, first set up these environment variables:

```sh
# Set CLI executable path for tests.
# Run this from the root of the project tree.
# If using Mac OS, first ensure realpath is installed: brew install coreutils
export REFACTR_CLI_PATH=$(realpath ./bin/refactrctl.js)
# Refactr platform auth token for "dynamic" test suite
export REFACTR_DYNAMIC_AUTH_TOKEN="<refactr-auth-token>"
# Refactr platform auth token for "static" test suite
export REFACTR_STATIC_AUTH_TOKEN="<refactr-auth-token>"
 ```

Ensure you have executed a build.

End-to-end tests are split into two types: static and dynamic.

Dynamic tests cover create, delete, and update operations.

Static tests are for verifying get and list operations. They require data on the server to be unchanged for the whole lifecycle. If you made any changes to corresponding entities on the development server, make sure to update tests first.

All requests are issued against [Refactr Platform API](https://api.devel.refactr.it/v1) endpoints. List of IDs of operational entities can be found in `e2e/helpers/knownIds.js`.

Run end-to-end tests with:

```sh
npm run test:e2e -u
```
