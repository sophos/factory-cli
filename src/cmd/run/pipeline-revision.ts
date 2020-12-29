import Client from '../../client';
import { createCommandResult } from '../handler';
import { createStream } from './run-event-stream';

type Arguments = {
  projectId: string;
  jobId: string;
  wait?: boolean;
};

export default async function job(
  apiClient: Client,
  { projectId, jobId, wait = false }: Arguments
) {
  const { data: run } = await apiClient.jobs.runJob(projectId, jobId);
  const stream = createStream(apiClient, run._id);

  if (wait) {
    return createCommandResult('streaming', stream);
  }

  return createCommandResult('view', run);
}
