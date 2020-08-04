function log(msg: string) {
    console.log(msg);
}

function error(msg: string) {
    console.error(msg);
}

function getErrorMessage(err: any) {
    const errors = err?.response?.data?.errors;
    if (errors && errors.length > 0) {
        return errors[0].message;
    } else if (err.message) {
        return err.message;
    }

    return 'Unknown error!';
}

function handleAPIError(err: any) {
    const statusCode = err?.response?.status;
    switch (statusCode) {
        case 401:
            error('Invalid or unspecified access token!');
            return;

        default:
            error(getErrorMessage(err));
            return;
    }
}

export { log, error, handleAPIError };
