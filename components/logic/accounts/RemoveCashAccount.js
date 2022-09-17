import firestore from '@react-native-firebase/firestore';

/**
 * A function that tries to remove a cash account with provided docId.
 */
export default function removeCashAccount(docId = null) {
    let errors = {};

    // Checking is all the provided data correct.
    if (docId === null)
        errors.document = {
            active: true,
            msg: 'It is not clear which account should be removed.',
        };

    if (Object.keys(errors).length !== 0) return errors;

    // Calling the Firebase function that removes a document.
    firestore()
        .collection('Accounts')
        .doc(docId)
        .delete()
        .then(() => {
            console.log('Account removed!');
        });

    return errors;
}
