import firestore from '@react-native-firebase/firestore';

/**
 * A function that tries to update a cash account of the given docId,
 * replacing its name value with the provided name.
 */
export function updateCashAccount(docId = null, name = null) {
    let errors = {};

    // Checking is all the data provided and is it correct.
    if (docId === null)
        errors.document = {
            active: true,
            msg: 'It is not clear which account should be updated.',
        };

    if (name.length < 1)
        errors.name = { active: true, msg: 'Account name should be provided.' };
    else if (name.length > 32)
        errors.name = { active: true, msg: 'Provided name is too long.' };

    if (Object.keys(errors).length !== 0) return errors;

    // Calling the Firebase function that updates a document.
    firestore()
        .collection('Accounts')
        .doc(docId)
        .update({
            name: name,
        })
        .then(() => {
            console.log('Account history added!');
        });

    return errors;
}
