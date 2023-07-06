import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';

export function removeCashAccountHistory(docId = null, indexesInHistory = [], history = null) {
    if (docId === null) {
        return ToastAndroid.show('It is not clear which account\'s record should be removed.', ToastAndroid.SHORT);
    }

    if (indexesInHistory === null || indexesInHistory.filter((index) => index >= history.length || index < 0).length > 0) {
        return ToastAndroid.show('It is not clear which records should be removed.', ToastAndroid.SHORT);
    }

    if (history === null) {
        return ToastAndroid.show('Account\'s history is undefined.', ToastAndroid.SHORT);
    }

    history = history.filter((_, index) => !indexesInHistory.includes(index));

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
