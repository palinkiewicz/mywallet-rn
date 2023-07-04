import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';

export function addCashAccountHistory(docId = null, value = 0, name = '', date = new Date()) {
    if (docId === null) {
        return ToastAndroid.show('It is not clear to which account the record should be assigned.', ToastAndroid.SHORT);
    }

    firestore()
        .collection('Accounts')
        .doc(docId)
        .update({
            history: firestore.FieldValue.arrayUnion({
                date: date.getTime(),
                name: name,
                value: value,
            }),
        })
        .then(() => {
            console.log('Account history added!');
        });
}
