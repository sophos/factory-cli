import { Run, RunEvents } from '@sophos-factory/api-client';
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
    const extraFields = ['events', 'operations', 'variables', 'outputs'];
    const { data: run } = await api.getRun(projectId, runId, extraFields);

    if (wait) {
      const stream = createStream(apiClient, projectId, runId);
      return createCommandResult('streaming', stream, fields.runEvent);
    }

    return createCommandResult('view', run, fields.run);
  }
);
