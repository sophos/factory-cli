import { createStream } from './run-event-stream';
import Client from '../../client';
import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  jobId: string;
  wait?: boolean;
  suppressEvents?: boolean;
  suppressOutputs?: boolean;
  variables?: { [key: string]: string };
};

export default handler<any, Arguments>(
  async (
    apiClient: Client,
    {
      projectId,
      jobId,
      wait = false,
      suppressEvents = false,
      suppressOutputs = false,
      variables = {},
    }: Arguments
  ) => {
    const { data: run } = await apiClient.jobs.runJob(projectId, jobId, {
      variables: { ...variables },
      suppress_outputs: suppressOutputs,
      suppress_events: suppressEvents,
    });
    const stream = createStream(apiClient, projectId, run._id);

    if (wait) {
      return createCommandResult('streaming', stream, fields.runEvent);
    }

    return createCommandResult('view', run);
  }
);
