import { createCommandResult, handler } from '../handler';
import { JobTriggerTypeEnum } from '@refactr/api-client';
import { JobTriggerType } from '../../job-trigger-type';

type Arguments = {
  projectId: string;
  pipelineId: string;
  name: string;
  pipelineRevision?: number;
  type: JobTriggerType;
  data?: any;

  suppressOutputs: boolean;
  suppressEvents: boolean;
  suppressVariables: boolean;
  disableOnFailure: boolean;
};

// TODO: implement scheduled data.
const triggerType = {
  'manual': JobTriggerTypeEnum.Manual,
  'scheduled': JobTriggerTypeEnum.Scheduled
};

export default handler<Arguments, any>(
  async (
    apiClient,
    {
      projectId,
      pipelineId,
      pipelineRevision,
      name,
      type,
      suppressEvents,
      suppressOutputs,
      suppressVariables,
      disableOnFailure
    }
  ) => {
    const api = apiClient.jobs;

    const { data: job } = await api.createJob(projectId, {
      pipeline_id: pipelineId,
      pipeline_revision_id: pipelineRevision,
      trigger_type: triggerType[type],
      name,
      suppress_events: suppressEvents,
      suppress_outputs: suppressOutputs,
      suppress_vars: suppressVariables,
      disable_on_failure: disableOnFailure
    });

    return createCommandResult('view', job, ['_id']);
  }
);
