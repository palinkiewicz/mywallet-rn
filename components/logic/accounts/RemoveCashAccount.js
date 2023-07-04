import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';

export function removeCashAccount(docId = null) {
    if (docId === null) {
        return ToastAndroid.show('It is not clear which account should be removed.', ToastAndroid.SHORT);
    }

    firestore()
        .collection('Accounts')
        .doc(docId)
        .delete()
        .then(() => {
            console.log('Account removed!');
        });

    return errors;
}
