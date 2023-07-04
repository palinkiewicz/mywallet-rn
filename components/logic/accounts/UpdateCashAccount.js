import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';

export function updateCashAccount(docId = null, name = '', icon = '') {
    if (docId === null) {
        return ToastAndroid.show('It is not clear which account should be updated.', ToastAndroid.SHORT);
    }

    firestore()
        .collection('Accounts')
        .doc(docId)
        .update({
            name: name,
            icon: icon === '' ? 'wallet' : icon,
        })
        .then(() => {
            console.log('Account updated!');
        });
}
