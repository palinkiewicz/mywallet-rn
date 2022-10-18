import firestore from '@react-native-firebase/firestore';

/**
 * A function that tries to update a cash account of the given docId,
 * replacing its name value with the provided name.
 */
export function updateCashAccount(docId = null, name = '', icon = '') {
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

    if (icon.length < 1) icon = 'wallet';
    else if (icon.length > 32)
        errors.icon = { active: true, msg: 'Provided icon tag is too long.' };

    if (Object.keys(errors).length !== 0) return errors;

    // Calling the Firebase function that updates a document.
    firestore()
        .collection('Accounts')
        .doc(docId)
        .update({
            name: name,
            icon: icon,
        })
        .then(() => {
            console.log('Account updated!');
        });

    return errors;
}
