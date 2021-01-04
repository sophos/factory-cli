import Client from '../../client';
import { createCommandResult } from '../handler';
import { createStream } from './run-event-stream';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  pipelineId: string;
  revision: number;

  wait?: boolean;
  suppressEvents?: boolean;
  suppressOutputs?: boolean;
  suppressVariables?: boolean;
  var?: { [key: string]: string };
};

export default async function job(
  apiClient: Client,
  {
    projectId,
    pipelineId,
    revision,
    suppressEvents = false,
    suppressOutputs = false,
    suppressVariables = false,
    var: variables,
    wait = false,
  }: Arguments
) {
  const { data: run } = await apiClient.pipelines.runPipeline(
    projectId,
    pipelineId,
    revision,
    {
      suppress_events: suppressEvents,
      suppress_outputs: suppressOutputs,
      suppress_vars: suppressVariables,
      variables,
    }
  );

  const stream = createStream(apiClient, run._id, projectId);

  if (wait) {
    return createCommandResult('streaming', stream);
  }

  return createCommandResult('view', run, fields.run);
}
