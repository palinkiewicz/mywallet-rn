import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';
import { validateAccountIcon, validateAccountName } from '../validation/AccountDataValidation';

export function addCashAccount(user = null, name = '', icon = '') {
    if (user === null || !user.uid) {
        return ToastAndroid.show('It is not clear which user the account should belong to.', ToastAndroid.SHORT);
    }

    if (validateAccountName(name) !== '' || validateAccountIcon(icon) !== '') {
        return ToastAndroid.show('Invalid data.', ToastAndroid.SHORT);
    }

    firestore()
        .collection('Accounts')
        .add({
            date_created: firestore.FieldValue.serverTimestamp(),
            user_id: user.uid,
            name: name.trim(),
            icon: icon.trim() === '' ? 'wallet' : icon.trim(),
            history: [],
        })
        .then(() => {
            console.log('Account added!');
        });
}
