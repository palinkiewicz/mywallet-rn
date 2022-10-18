import firestore from '@react-native-firebase/firestore';

/**
 * A function that tries to remove a cash account history record
 * by overwriting the history value of the document with the provided docId
 * with updated an history array that doesn't have the record.
 *
 * It works like that, because Firebase's arrayRemove method removes all the records that are similar,
 * but here, a user can have many records that look exactly the same, but may want to remove just one of them.
 */
export function removeCashAccountHistory(
    docId = null,
    indexInHistory = null,
    history = null
) {
    let errors = {};

    // Checking is all the required data provided and is it correct.
    if (docId === null)
        errors.document = {
            active: true,
            msg: "It is not clear which account's record should be removed.",
        };

    if (
        indexInHistory === null ||
        isNaN(indexInHistory) ||
        indexInHistory >= history.length ||
        indexInHistory < 0
    )
        errors.record = {
            active: true,
            msg: 'It is not clear which record should be removed.',
        };

    if (history === null)
        errors.history = {
            active: true,
            msg: 'Accounts history is undefined.',
        };

    if (Object.keys(errors).length !== 0) return errors;

    // Removing record from the history array.
    history.splice(indexInHistory, 1);

    // Calling the Firebase function that updates a document and asking it to overwrite the history value.
    firestore()
        .collection('Accounts')
        .doc(docId)
        .update({
            history: history,
        })
        .then(() => {
            console.log('Account history removed!');
        });

    return errors;
}
