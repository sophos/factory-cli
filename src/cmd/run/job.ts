import { createStream } from '../run-event-stream';
import Client from '../../client';
import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  jobId: string;
  wait?: boolean;
  suppressEvents?: boolean;
  suppressOutputs?: boolean;
  var?: { [key: string]: string };
};

export default handler<Arguments, any>(
  async (
    apiClient,
    {
      projectId,
      jobId,
      wait = false,
      suppressEvents = false,
      suppressOutputs = false,
      var: variables
    }
  ) => {
    const { data: run } = await apiClient.jobs.runJob(projectId, jobId, {
      variables,
      suppress_outputs: suppressOutputs,
      suppress_events: suppressEvents
    });

    if (wait) {
      const stream = createStream(apiClient, projectId, run._id!);
      return createCommandResult('streaming', stream, fields.runEvent);
    }

    return createCommandResult('view', run, fields.run);
  }
);
