export function validateAccountName(text) {
    if (text == null) {
        return 'Null or undefined value';
    } else if (text.trim().length < 1) {
        return 'Must be provided';
    } else if (text.trim().length > 32) {
        return 'Max 32 characters';
    } else {
        return '';
    }
}

export function validateAccountIcon(text) {
    if (text == null) {
        return 'Null or undefined value';
    } else if (text.trim().length > 32) {
        return 'Max 32 characters';
    } else {
        return '';
    }
}
