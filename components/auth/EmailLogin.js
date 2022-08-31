import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function EmailLogin() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    function enteredEmailHandler(enteredText) {
        setEnteredEmail(enteredText);
    }

    function enteredPasswordHandler(enteredText) {
        setEnteredPassword(enteredText);
    }

    function logInUser() {
        if (enteredEmail == '') {
            return console.error('Please enter an email.')
        } else if (enteredPassword == '') {
            return console.error('Please enter a password.')
        }

        auth().signInWithEmailAndPassword(enteredEmail, enteredPassword)
            .then(() => {
                console.log('User signed in!');
            })
            .catch(error => {
                if (error.code == 'auth/user-not-found') {
                    console.log('User not found.')
                } else if (error.code == 'auth/wrong-password') {
                    console.log('Wrong password.')
                } else if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error.code);
            });
    }

    return (
        <View>
            <TextInput placeholder='email' onChangeText={enteredEmailHandler} value={enteredEmail} />
            <TextInput placeholder='password' onChangeText={enteredPasswordHandler} value={enteredPassword} />
            <Button title='Log-in' onPress={logInUser} />
        </View>
    );
}