/**
 * Fields of various objects that we'd like to print in human-readable mode
 * like "log" or "table".
 *
 * NOTE: fields MUST be provided in order they will be logged.
 */
export default {
  project: [
    '_id',
    'name',
    'pipeline_count',
    'organization_id',
    'created',
    'modified',
  ],
  organization: [
    '_id',
    'name',
    'contact_name',
    'contact_email',
    'plan_quotas',
    'created',
    'modified',
  ],
  run: [
    '_id',
    'organization_id',
    'job_id',
    'status',
    'created',
    'started',
    'finished',
    'suppress_events',
    'suppress_outputs',
    'suppress_vars',
  ],
  runEvent: ['occurred', 'level', 'message', 'details'],
  job: [
    '_id',
    'project_id',
    'pipeline_id',
    'pipeline_revision_id',
    'pipeline_version_id',
    'created',
    'name',
    'number',
    'enabled',
    'trigger_type',
    'schedule',
    'suppress_outputs',
    'suppress_vars',
    'suppress_events',
    'disable_on_failure',
    'variables',
  ],
  pipelineRevision: ['_id', 'revision', 'pipeline_id'],
};
