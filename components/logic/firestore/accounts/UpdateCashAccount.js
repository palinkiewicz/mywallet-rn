import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';
import { validateAccountIcon, validateAccountName } from '../../validation/AccountDataValidation';

export function updateCashAccount(docId = null, name = '', icon = '') {
    if (docId === null) {
        return ToastAndroid.show('It is not clear which account should be updated.', ToastAndroid.SHORT);
    }

    if (validateAccountName(name) !== '' || validateAccountIcon(icon) !== '') {
        return ToastAndroid.show('Invalid data.', ToastAndroid.SHORT);
    }

    firestore()
        .collection('Accounts')
        .doc(docId)
        .update({
            name: name.trim(),
            icon: icon.trim() === '' ? 'wallet' : icon.trim(),
        })
        .then(() => {
            console.log('Account updated!');
        });
}
