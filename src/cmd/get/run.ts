import { Run, RunEvents } from '@refactr/api-client';
import fields from '../../fields';
import { createCommandResult, handler } from '../handler';
import { createStream } from '../run-event-stream';

type Arguments = {
  projectId: string;
  runId: string;
  wait?: boolean;
};

export default handler<Arguments, AsyncGenerator<RunEvents> | Run>(
  async (apiClient, { projectId, runId, wait = false }: Arguments) => {
    const api = apiClient.runs;
    const { data: run } = await api.getRun(projectId, runId);

    if (wait) {
      const stream = createStream(apiClient, projectId, runId);
      return createCommandResult('streaming', stream, fields.runEvent);
    }

    return createCommandResult('view', run, fields.run);
  }
);
