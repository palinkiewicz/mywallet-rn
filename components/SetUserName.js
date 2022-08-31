import React, { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import firestore from '@react-native-firebase/firestore';

export default function SetUserName({ userid }) {
    const [enteredName, setEnteredName] = useState('');

    function enteredNameHandler(enteredText) {
        setEnteredName(enteredText);
    }

    function setUserName() {
        firestore().collection('usersData').doc(userid).update({
            name: enteredName,
        }).then(() => {

        });
    }

    return (
        <View>
            <TextInput placeholder='Input username' onChangeText={enteredNameHandler} value={enteredName} />
            <Button title='Set username' onPress={setUserName} />
        </View>
    )
}