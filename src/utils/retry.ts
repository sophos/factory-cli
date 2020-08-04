async function retry<T>(fn: () => T, n: number): Promise<T> {
    try {
        return await fn();
    } catch (err) {
        if (n === 0) {
            throw err;
        }

        return retry(fn, n - 1);
    }
}

export { retry };
