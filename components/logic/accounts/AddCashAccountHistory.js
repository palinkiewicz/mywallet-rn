import firestore from '@react-native-firebase/firestore';

/**
 * A function that tries to add to the Firebase a new cash account history record
 * by adding it to a history array of the document with the provided docId.
 *
 * A single history record consists of a value (amount) - either positive
 * or negative - and a name, which is an optional value.
 */
export function addCashAccountHistory(docId = null, value = 0, name = '') {
    let errors = {};

    // Checking is all the required data provided and is it correct.
    if (docId === null)
        errors.document = {
            active: true,
            msg: 'It is not clear to which account the record should be assigned.',
        };

    if (parseFloat(value) !== value)
        errors.value = { active: true, msg: 'Provided value is not a number.' };
    else if (value === 0)
        errors.value = {
            active: true,
            msg: 'Provided value must not be equal to 0.',
        };

    if (name.length > 32)
        errors.name = { active: true, msg: 'Provided name is too long.' };

    if (Object.keys(errors).length !== 0) return errors;

    // Calling the Firebase function that updates a document and asking it to add a record.
    firestore()
        .collection('Accounts')
        .doc(docId)
        .update({
            history: firestore.FieldValue.arrayUnion({
                date: Date.now(),
                name: name,
                value: value,
            }),
        })
        .then(() => {
            console.log('Account history added!');
        });

    return errors;
}
