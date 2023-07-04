export function validateAccountName(text) {
    if (text.trim().length < 1) {
        return 'Must be provided'
    } if (text.trim().length > 32) {
        return 'Max 32 characters';
    } else {
        return '';
    }
}

export function validateAccountIcon(text) {
    if (text.trim().length > 32) {
        return 'Max 32 characters';
    } else {
        return '';
    }
}