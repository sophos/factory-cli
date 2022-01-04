# Release Process

This document describes the process for creating a release and publishing a new version of the CLI.

## Prerequisites

- Install [Git](https://git-scm.com/downloads) and [npm](https://www.npmjs.com/)
- [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repository

## Create a Release

1. Bump the version number in `package.json`. Use [Semantic Versioning](https://semver.org).
2. Regenerate the `package-lock.json`.
3. Commit and Git tag these changes. Use `v` followed by the version number, for example: `git tag -a v1.2.0`.
4. Push the changes to the GitHub repository, including the tag (`git push --tags`).
5. The push of the `v*` tag will trigger workflows that test the project, then publish the new releases. The workflows named `publish_*` will automatically upload release assets (binaries) and create releases for npm, GPR, and Docker Hub. Ensure the workflows complete successfully.

*Note on end-to-end tests:* these tests currently interact with the live API and dynamic data. They can fail for network or async reasons, or because the snapshots need to be updated. If the test suite fails, you can try re-running the tests manually with the **Re-run all jobs** button for the GitHub Action. Future planned improvements will update the tests to improve this behavior.

New updates can be viewed at:

- Repository releases page: https://github.com/sophos-factory/cli/releases
- The npm package page: https://www.npmjs.com/package/@sophos-factory/cli
- Docker Hub: https://hub.docker.com/r/refactr/cli
