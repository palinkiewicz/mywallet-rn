export function validateAccountHistoryName(text) {
    if (text == null) {
        return 'Null or undefined value';
    } else if (text.trim().length > 32) {
        return 'Max 32 characters';
    } else {
        return '';
    }
}

export function validateAccountHistoryValue(text) {
    const value = Number(text.trim());

    if (text == null) {
        return 'Null or undefined value';
    } else if (text.trim() === '') {
        return 'Must be provided';
    } else if (isNaN(value)) {
        return 'Must be a number';
    } else if (value === 0) {
        return 'Must not be zero';
    } else if (text.trim().split('.')[1]?.length > 2) {
        return 'Max 2 decimal spaces';
    } else if (value > 9999999999) {
        return 'Number too big';
    } else if (value < -9999999999) {
        return 'Number too small';
    } else {
        return '';
    }
}

export function validateAccountHistoryDate(date) {
    const minimumDate = new Date(1970, 0, 1);
    const currentDate = new Date();

    if (date == null) {
        return 'Null or undefined value';
    } else if (date < minimumDate) {
        return 'Must be no earlier than ' + minimumDate.toLocaleDateString('en-GB');
    } else if (date > currentDate) {
        return 'Must be no later than ' + currentDate.toLocaleDateString('en-GB');
    } else {
        return '';
    }
}
