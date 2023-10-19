import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';
import {
    validateAccountHistoryDate,
    validateAccountHistoryName,
    validateAccountHistoryValue,
} from '../../validation/AccountHistoryDataValidation';

export function addCashAccountHistory(docId = null, value = 0, name = '', date = new Date()) {
    if (docId === null) {
        return ToastAndroid.show('It is not clear to which account the record should be assigned.', ToastAndroid.SHORT);
    }

    if (
        validateAccountHistoryName(name) !== '' ||
        validateAccountHistoryValue(value.toString()) !== '' ||
        validateAccountHistoryDate(date) !== ''
    ) {
        return ToastAndroid.show('Invalid data.', ToastAndroid.SHORT);
    }

    firestore()
        .collection('Accounts')
        .doc(docId)
        .update({
            history: firestore.FieldValue.arrayUnion({
                date: date.getTime(),
                name: name.trim(),
                value: value,
            }),
        })
        .then(() => {
            console.log('Account history added!');
        });
}
