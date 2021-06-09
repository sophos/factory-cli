import isNil from 'lodash/isNil';
import { RunEvents } from '@refactr/api-client';
import fields from '../fields';
import { createCommandResult, handler } from './handler';
import { createStream } from './run-event-stream';

type Arguments = {
  projectId: string;
  runId: string;
};

export default handler<Arguments, AsyncGenerator<RunEvents>>(
  async (apiClient, { projectId, runId }: Arguments) => {
    const { data: run } = await apiClient.runs.getRun(projectId, runId);
    if (isNil(run)) {
      throw new Error(
        `Run with specified ID ${runId} cannot be found in project with ID ${projectId}`
      );
    }

    const stream = createStream(apiClient, projectId, runId);
    return createCommandResult('streaming', stream, fields.runEvent);
  }
);
