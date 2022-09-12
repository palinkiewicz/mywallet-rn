import firestore from '@react-native-firebase/firestore';

/**
 * A function that tries to add to the Firebase a new cash account
 * that belongs to the provided user and has the provided name.
 */
export default function addCashAccount(user, name) {
    firestore()
        .collection('Accounts')
        .add({
            date_created: firestore.FieldValue.serverTimestamp(),
            user_id: user.uid,
            name: name,
            history: [],
        })
        .then(() => {
            console.log('Account added!');
        });
}
