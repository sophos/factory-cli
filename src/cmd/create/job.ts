import isNil from 'lodash/isNil';

import { factoryApi } from '@sophos-factory/api-client';

import { createCommandResult, handler } from '../handler';
import { JobTriggerType } from '../../job-trigger-type';

type Arguments = {
  projectId: string;
  pipelineId: string;
  revisionId: string;
  name: string;
  type: JobTriggerType;
  data?: unknown;

  suppressOutputs: boolean;
  suppressEvents: boolean;
  suppressVariables: boolean;
  disableOnFailure: boolean;
  var?: { [key: string]: string };
  schedule?: {
    startDay: string;
    startTime: string;
    offset: string;
    interval: number;
    intervalType: 'minute' | 'hour' | 'day' | 'week' | 'month';
  };
};

const triggerType = {
  manual: factoryApi.JobTriggerTypeEnum.Manual,
  scheduled: factoryApi.JobTriggerTypeEnum.Scheduled
};

const intervalType = {
  minute: factoryApi.JobScheduleIntervalTypeEnum.Minute,
  hour: factoryApi.JobScheduleIntervalTypeEnum.Hour,
  day: factoryApi.JobScheduleIntervalTypeEnum.Day,
  week: factoryApi.JobScheduleIntervalTypeEnum.Week,
  month: factoryApi.JobScheduleIntervalTypeEnum.Month
};

export default handler(
  async (
    apiClient,
    {
      projectId,
      pipelineId,
      revisionId,
      name,
      type,
      suppressEvents,
      suppressOutputs,
      suppressVariables,
      disableOnFailure,
      var: variables,
      schedule
    }: Arguments
  ) => {
    const api = apiClient.jobs;

    const { data: job } = await api.createJob(projectId, {
      pipeline_id: pipelineId,
      pipeline_revision_id: revisionId,
      trigger_type: triggerType[type],
      name,
      suppress_events: suppressEvents,
      suppress_outputs: suppressOutputs,
      suppress_vars: suppressVariables,
      disable_on_failure: disableOnFailure,
      variables,

      schedule: !isNil(schedule)
        ? {
            start_day: schedule.startDay,
            start_time: schedule.startTime,
            offset: schedule.offset,
            interval: schedule.interval,
            interval_type: !isNil(schedule.intervalType)
              ? intervalType[schedule.intervalType]
              : undefined
          }
        : undefined
    });

    return createCommandResult('view', job, ['_id']);
  }
);
