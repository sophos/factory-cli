import { factoryApi } from '@sophos-factory/api-client';
import { createCommandResult, handler } from './handler';
import { createStream } from './run-event-stream';
import fields from '../fields';

type Arguments = {
  projectId: string;
  runId: string;
  wait?: boolean;
};

export default handler<
  Arguments,
  AsyncGenerator<factoryApi.RunEvents> | factoryApi.InlineResponse201
>(async (apiClient, { projectId, runId, wait = false }) => {
  const { data: run } = await apiClient.runs.rerunRun(projectId, runId);

  if (wait) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stream = createStream(apiClient, projectId, run._id!);
    return createCommandResult('streaming', stream, fields.runEvent);
  }

  return createCommandResult('view', run, fields.run);
});
