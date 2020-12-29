import Client from '../../client';

enum TerminatingState {
  succeeded = 'Succeeded',
  failed = 'Failed',
}

export function createStream(
  apiClient: Client,
  projectId: string,
  runId: string
) {
  const api = apiClient.runs;
  let offset = 0;

  async function getRunEvents() {
    let run;
    try {
      run = (await api.getRun(projectId, runId)).data;
    } catch (err) {
      return {
        events: [],
        done: true,
      };
    }

    const events = run?.events?.slice(offset) ?? [];
    offset += events.length;

    return {
      events,
      done:
        run?.status === TerminatingState.failed ||
        run?.status === TerminatingState.succeeded,
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
