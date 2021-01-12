import {
  CredentialTypeEnum,
  RunnerAgentEvents,
  RunnerAgentOptions
} from '@refactr/api-client/types/generated/api';

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
    'modified'
  ],
  organization: [
    '_id',
    'name',
    'contact_name',
    'contact_email',
    'created'
  ],
  run: [
    '_id',
    'number',
    'organization_id',
    'job_id',
    'status',
    'created',
    'started',
    'finished',
    'suppress_events',
    'suppress_outputs',
    'suppress_vars'
  ],
  runEvent: ['occurred', 'level', 'message', 'details'],
  job: [
    '_id',
    'created',
    'name',
    'enabled',
    'trigger_type'
  ],
  pipelineRevision: ['_id', 'revision', 'pipeline_id'],
  pipeline: [
    '_id',
    'name',
    'organization_id',
    'project_id',
    'created',
    'modified',
    'step_count',
    'revision_count'
  ],

  runner: [
    '_id',
    'organization_id',
    'created',
    'name',
    'host_type',
    'machine_type',
    'version',
    'started',
    'heartbeat',
    'status',
    'idle_since',
    'stop_pending',
    'events',
    'options'
  ],
  credential: ['_id', 'created', 'name', 'id', 'type', 'data']
};
