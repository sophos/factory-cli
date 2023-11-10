import { factoryApi } from '@sophos-factory/api-client';

import fields from '../../fields';
import { createCommandResult, handler } from '../handler';
import { createStream } from '../run-event-stream';

type Arguments = {
  projectId: string;
  jobId: string;
  wait?: boolean;
  suppressEvents?: boolean;
  suppressOutputs?: boolean;
  var?: { [key: string]: string };
};

export default handler<
  Arguments,
  AsyncGenerator<factoryApi.RunEvents> | factoryApi.InlineResponse201
>(
  async (
    apiClient,
    {
      projectId,
      jobId,
      wait = false,
      suppressEvents = false,
      suppressOutputs = false,
      var: variables
    }: Arguments
  ) => {
    const { data: run } = await apiClient.jobs.runJob(projectId, jobId, {
      variables,
      suppress_outputs: suppressOutputs,
      suppress_events: suppressEvents
    });

    if (wait) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const stream = createStream(apiClient, projectId, run._id!);
      return createCommandResult('streaming', stream, fields.runEvent);
    }

    return createCommandResult('view', run, fields.run);
  }
);
