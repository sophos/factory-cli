import { render } from 'console-table-printer';

const formatters = {
    table: (data: any) => {
        return render(data);
    },
    json: (data: any) => {
        return JSON.stringify(data, null, 2);
    }
};

export function format(formatType, data) {
    const formatter = formatters[formatType];
    if (!formatter) {
        throw new Error('Unrecognized format type');
    }
    return formatter(data);
}

export function print(formatType, data) {
    const formattedData = format(formatType, data);
    console.info(formattedData);
}
