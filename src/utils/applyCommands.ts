import { Command } from 'commander';

function applyCommands(program: Command, fns: Array<(p: Command) => void>) {
    fns.forEach((fn) => fn(program));

    return program;
}

export { applyCommands };
