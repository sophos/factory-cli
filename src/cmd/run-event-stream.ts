import { Run, RunEvents, RunStatusEnum } from '@sophos-factory/api-client';
import type Client from '../client';

export function createStream(
  apiClient: Client,
  projectId: string,
  runId: string
): AsyncGenerator<RunEvents, void, undefined> {
  const api = apiClient.runs;
  let offset = 0;

  async function getRunEvents() {
    let run: Run;
    try {
      const extraFields = ['events', 'operations', 'variables', 'outputs'];
      run = (await api.getRun(projectId, runId, extraFields)).data;
    } catch (err) {
      return {
        events: [],
        done: true,
        isErrored: true
      };
    }

    const events = run?.events?.slice(offset) ?? [];
    offset += events.length;

    return {
      events,
      done:
        run?.status === RunStatusEnum.Failed ||
        run?.status === RunStatusEnum.Succeeded,
      isErrored: false
    };
  }

  return (async function* () {
    while (1) {
      const { events, done } = await getRunEvents();

      yield* events;
      await delay(1000);

      if (done) return;
    }
  })();
}

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
