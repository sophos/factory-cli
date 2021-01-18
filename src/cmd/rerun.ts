import { createCommandResult, handler } from './handler';
import { createStream } from './run-event-stream';
import fields from '../fields';

type Arguments = {
  projectId: string;
  runId: string;
  wait?: boolean;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, runId, wait = false }) => {
    const { data: run } = await apiClient.runs.rerunRun(projectId, runId);

    if (wait) {
      const stream = createStream(apiClient, projectId, run._id!);
      return createCommandResult('streaming', stream, fields.runEvent);
    }

    return createCommandResult('view', run, fields.run);
  }
);
