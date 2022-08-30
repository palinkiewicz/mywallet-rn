import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function EmailSignup() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    function enteredEmailHandler(enteredText) {
        setEnteredEmail(enteredText);
    }

    function enteredPasswordHandler(enteredText) {
        setEnteredPassword(enteredText);
    }

    function createNewUser() {
        if (enteredEmail == '') {
            return console.error('Please enter an email.')
        } else if (enteredPassword == '') {
            return console.error('Please enter a password.')
        }

        auth().createUserWithEmailAndPassword(enteredEmail, enteredPassword)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                } else if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }

    return (
        <View>
            <TextInput placeholder='email' onChangeText={enteredEmailHandler} value={enteredEmail} />
            <TextInput placeholder='password' onChangeText={enteredPasswordHandler} value={enteredPassword} />
            <Button title='Sign-up' onPress={createNewUser} />
        </View>
    );
}