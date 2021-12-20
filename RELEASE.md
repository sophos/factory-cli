# Release Process

This document describes the process for creating a release and publishing a new version of the CLI.

## Prerequisites

- Install [Git](https://git-scm.com/downloads) and [npm](https://www.npmjs.com/)
- [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repository

## Create a Release

1. Bump the version number in `package.json`. Use [Semantic Versioning](https://semver.org).
2. Run `npm install` to regenerate the `package-lock.json`.
3. Commit and Git tag these changes. Use `v` followed by the version number, for example: `git tag -a v1.2.0`.
4. Push the changes to the GitHub repository, including the tag (`git push --tags`).
5. The push of the `v*` tag will trigger workflows that test the project, then create a new Release on GitHub. The Action [Publish packages](.github/workflows/publish.yml) will automatically upload release assets (binaries) and create releases for npm, GPR, and Docker Hub. Ensure the Action completes successfully.

New updates can be viewed at:

- Repository releases page: https://github.com/refactr/refactr-cli/releases
- The npm package page: https://www.npmjs.com/package/@refactr/cli
- Docker Hub: https://hub.docker.com/r/refactr/cli
