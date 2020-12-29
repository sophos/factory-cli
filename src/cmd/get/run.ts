import { createCommandResult, CommandHandler, handler } from '../handler';
import fields from '../../fields';
import type Client from '../../client';

type Arguments = {
  projectId: string;
  runId: string;
};

export default handler<Arguments, any>(
  async (apiClient: Client, { projectId, runId }) => {
    const api = apiClient.runs;
    const { data: run } = await api.getRun(projectId, runId);

    return createCommandResult('view', run, fields.run);
  }
);
