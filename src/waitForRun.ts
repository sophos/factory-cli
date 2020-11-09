import { RunsApi } from '@refactr/api-client';
import { retry } from './utils/retry';
import { error, log } from './utilities';
import { printTable } from 'console-table-printer';
import { getConfig } from './getConfig';

const FINISH_STATUSES = ['Succeeded', 'Failed'];

const delay = (delayMs: number): Promise<void> =>
    new Promise<void>((resolve) =>
        setTimeout(() => {
            resolve();
        }, delayMs)
    );

async function waitForRun(
    projectId: string,
    runId: string,
    basePath: string,
    accessToken: string,
    delayMs = 1000
): Promise<{ finish: boolean; run: any } | undefined> {
    const config = getConfig(basePath, accessToken);
    const runClient = new RunsApi(config);
    let eventsOffset = 0;

    for (;;) {
        await delay(delayMs);

        let result;
        try {
            result = await retry(async () => {
                const { data: run = {} } = await runClient.getRun(
                    projectId,
                    runId
                );

                if (typeof run === 'undefined') {
                    throw new Error('Unable to retrieve run!');
                }

                if (FINISH_STATUSES.includes(run.status)) {
                    return {
                        finished: true,
                        run
                    };
                }

                return {
                    finished: false,
                    run
                };
            }, 3);
        } catch (err) {
            error(err.message);
            return;
        }

        const events = result?.run?.events ?? [];
        const totalEvents = events?.length ?? 0;

        for (let i = eventsOffset; i < totalEvents; i++) {
            if (typeof events[i] !== 'undefined') {
                const event = events[i];

                log(`[${event.level}] ${event.occurred} - ${event.message}`);
                if (event.details) {
                    log(event.details);
                }
            }
        }

        eventsOffset = totalEvents;

        if (result.finished) {
            const outputs = result?.run?.outputs;

            if (outputs) {
                log('\n');
                log('outputs');
                printTable(
                    Object.keys(outputs).map((key) => ({
                        name: key,
                        value: outputs[key]
                    }))
                );
            }

            return;
        }
    }
}

export { waitForRun };
