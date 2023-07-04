import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';

export function updateCashAccountHistory(
    docId = null,
    indexInHistory = null,
    history = null,
    value = null,
    name = null,
    date = null
) {
    if (docId === null) {
        return ToastAndroid.show('It is not clear which account\'s record should be updated.', ToastAndroid.SHORT);
    }

    if (
        indexInHistory === null ||
        isNaN(indexInHistory) ||
        indexInHistory >= history.length ||
        indexInHistory < 0
    ) {
        return ToastAndroid.show('It is not clear which record should be updated.', ToastAndroid.SHORT);
    }

    if (history === null) {
        return ToastAndroid.show('Accounts history is undefined.', ToastAndroid.SHORT);
    }

    history[indexInHistory] = {
        name: name === null ? record.name : name,
        value: value === null ? record.value : value,
        date: date === null ? record.date : date.getTime(),
    };

    firestore()
        .collection('Accounts')
        .doc(docId)
        .update({
            history: history,
        })
        .then(() => {
            console.log('Account history updated!');
        });
}
