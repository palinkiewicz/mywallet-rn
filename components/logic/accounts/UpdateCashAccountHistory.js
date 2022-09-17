import firestore from '@react-native-firebase/firestore';

/**
 * A function that tries to update a cash account history record
 * by overwriting the history value of the document with the provided docId
 * with updated an history array that has the updated value and name of a map on indexInHistory.
 */
export default function updateCashAccountHistory(
    docId = null,
    indexInHistory = null,
    history = null,
    value = null,
    name = null
) {
    let errors = {};

    // Checking is all the required data provided and is it correct.
    if (docId === null)
        errors.document = {
            active: true,
            msg: "It is not clear which account's record should be updated.",
        };

    if (
        indexInHistory === null ||
        isNaN(indexInHistory) ||
        indexInHistory >= history.length ||
        indexInHistory < 0
    )
        errors.record = {
            active: true,
            msg: 'It is not clear which record should be updated.',
        };

    if (history === null)
        errors.history = {
            active: true,
            msg: 'Accounts history is undefined.',
        };

    if (value !== null && parseFloat(value) !== value)
        errors.value = { active: true, msg: 'Provided value is not a number.' };
    else if (value === 0)
        errors.value = {
            active: true,
            msg: 'Provided value must not be equal to 0.',
        };

    if (name !== null && name.length > 32)
        errors.name = { active: true, msg: 'Provided name is too long.' };

    if (Object.keys(errors).length !== 0) return errors;

    // Checking whether the provided values differ from those in Firestore.
    let record = history[indexInHistory];

    if (
        (record.value === value || value === null) &&
        (record.name === name || name === null)
    ) {
        return errors;
    } else {
        history[indexInHistory] = {
            name: name === null ? record.name : name,
            value: value === null ? record.value : value,
        };
    }

    // Calling the Firebase function that updates a document and asking it to overwrite the history value.
    firestore()
        .collection('Accounts')
        .doc(docId)
        .update({
            history: history,
        })
        .then(() => {
            console.log('Account history updated!');
        });

    return errors;
}
