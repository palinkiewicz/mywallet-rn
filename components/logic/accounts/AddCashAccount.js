import firestore from '@react-native-firebase/firestore';

/**
 * A function that tries to add to the Firebase a new cash account
 * that belongs to the provided user and has the provided name and icon.
 */
export function addCashAccount(user = null, name = '', icon = '') {
    let errors = {};

    // Checking is all the provided data correct.
    if (user === null || !user.uid)
        errors.user = {
            active: true,
            msg: 'It is not clear which user the account should belong to.',
        };

    if (name.length < 1)
        errors.name = { active: true, msg: 'Account name should be provided.' };
    else if (name.length > 32)
        errors.name = { active: true, msg: 'Provided name is too long.' };

    if (icon.length < 1) icon = 'wallet';
    else if (icon.length > 32)
        errors.icon = { active: true, msg: 'Provided icon tag is too long.' };

    if (Object.keys(errors).length !== 0) return errors;

    // Calling the Firebase function that adds a new document containing cash account data.
    firestore()
        .collection('Accounts')
        .add({
            date_created: firestore.FieldValue.serverTimestamp(),
            user_id: user.uid,
            name: String(name),
            icon: String(icon),
            history: [],
        })
        .then(() => {
            console.log('Account added!');
        });

    return errors;
}
