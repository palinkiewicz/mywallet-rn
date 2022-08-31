import React, {useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import SetUserName from './SetUserName';

export default function UserLoggedIn({ user }) {
    const [userData, setUserData] = useState({});

    function signOut() {
        auth().signOut().then(() => console.log('User signed out!'));
    }

    useEffect(() => {
        const getUserData = async () => {
            const userDataRef = firestore().collection('usersData').doc(user.uid);

            await userDataRef.get().then((docSnapshot) => {
                if (docSnapshot.exists) {
                    setUserData(docSnapshot.data());
                } else {
                    userDataRef.set({
                        'name': user.email,
                    }).then(async () => {
                        setUserData(await userDataRef.get().data());
                    });
                }
            });

            console.log('gotUserData');
        }

        getUserData()
    }, []);

    return (
        <View>
            <Text>Welcome {user.email}; {user.uid}; {userData.name}</Text>
            <Button title='Sign-out' onPress={signOut} />
            <SetUserName userid={user.uid} />
        </View>
    );
}