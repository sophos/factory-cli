import { createProgram } from './cmd';
import * as util from './utilities';

const handleError = (err: any) => {
    util.handleAPIError(err);
    process.exit(1);
};

function listenGlobalEvents() {
    process.on('unhandledRejection', handleError);
    process.on('uncaughtException', handleError);
}

function main(argv: any[]) {
    listenGlobalEvents();

    const program = createProgram();

    program.parseAsync(argv);
}

export default main;
