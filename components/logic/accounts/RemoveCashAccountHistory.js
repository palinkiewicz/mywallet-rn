import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';

export function removeCashAccountHistory(docId = null, indexInHistory = null, history = null) {
    if (docId === null) {
        return ToastAndroid.show('It is not clear which account\'s record should be removed.', ToastAndroid.SHORT);
    }

    if (indexInHistory === null || isNaN(indexInHistory) || indexInHistory >= history.length || indexInHistory < 0) {
        return ToastAndroid.show('It is not clear which record should be removed.', ToastAndroid.SHORT);
    }

    if (history === null) {
        return ToastAndroid.show('Account\'s history is undefined.', ToastAndroid.SHORT);
    }

    history.splice(indexInHistory, 1);

    firestore()
        .collection('Accounts')
        .doc(docId)
        .update({
            history: history,
        })
        .then(() => {
            console.log('Account history removed!');
        });
}
