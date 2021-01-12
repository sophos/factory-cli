import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  runId: string;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, runId }) => {
    const api = apiClient.runs;
    const { data: run } = await api.getRun(projectId, runId);

    return createCommandResult('view', run, fields.run);
  }
);