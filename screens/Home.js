import { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function HomeScreen({ navigation }) {
    function signOut() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    return (
        <View>
            <Text>Home</Text>
            <Button
                title="navi"
                onPress={() => navigation.navigate('Welcome')}
            />
            <Button title="sign out" onPress={signOut} />
        </View>
    );
}
