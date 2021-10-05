const knownIds = {
  static: {
    organization: '5f9f2d08e2f1bb2436e6f5b0',
    project: '5ffc715d04ea5ca71d201bb3', // "CLI tests [STATIC ONLY] (LIST, GET)"
    job: '6001773304ea5cdf12201bc9', // "Test job"
    pipeline: '5ffde06a04ea5cf045201bbc', // "Test Pipeline"
    runner: '600187ce44a454482f23890b', // "CLI Test (container)"
    credential: 'cli_test_cred_1',
    pipelineRevision: '5ffdecc804ea5c1c58201bbf' // "Revision #4"
  },
  dynamic: {
    job: '604f464f192b5c8167a4415a', // "Test job"
    project: '6010f6e2a830874a04689246', // "CLI tests [DYNAMIC] ( CREATE, UPDATE, DELETE)"
    organization: '5f9f2d08e2f1bb2436e6f5b0',
    pipeline: '6047b2750a563e6839955fd3', // "Job pipeline"
    pipelineRevision: '616052c4f1210f4cca717435' // "Revision #5"
  }
};

export default knownIds;
