/**
 * Fields of various objects that we'd like to print in human-readable mode
 * like "log" or "table".
 *
 * NOTE: fields MUST be provided in order they will be logged.
 */
export default {
  // Table
  project: ['_id', 'name', 'pipeline_count', 'organization_id', 'created'],
  organization: ['_id', 'name', 'contact_name', 'contact_email', 'created'],
  run: [
    '_id',
    'number',
    'organization_id',
    'job_id',
    'status',
    'started',
    'finished',
    'suppress_events',
    'suppress_outputs',
    'suppress_vars',
    'created'
  ],
  job: ['_id', 'name', 'enabled', 'trigger_type', 'created'],
  pipelineRevision: ['_id', 'revision', 'created'],
  pipeline: [
    '_id',
    'organization_id',
    'project_id',
    'name',
    'step_count',
    'revision_count',
    'created'
  ],
  runnerAgent: ['_id', 'organization_id', 'name', 'status', 'created'],
  runnerPool: [
    '_id',
    'organization_id"',
    'name',
    'created',
    'runner_manager_meta',
    'runner_manager_options',
    'runner_options'
  ],
  credential: ['id', 'name', 'type', 'data', 'created'],
  // Log
  runEvent: ['occurred', 'level', 'message', 'details']
};
