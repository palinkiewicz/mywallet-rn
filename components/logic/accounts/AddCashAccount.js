import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';

export function addCashAccount(user = null, name = '', icon = '') {
    if (user === null || !user.uid) {
        return ToastAndroid.show('It is not clear which user the account should belong to.', ToastAndroid.SHORT);
    }

    firestore()
        .collection('Accounts')
        .add({
            date_created: firestore.FieldValue.serverTimestamp(),
            user_id: user.uid,
            name: name,
            icon: icon === '' ? 'wallet' : icon,
            history: [],
        })
        .then(() => {
            console.log('Account added!');
        });
}
