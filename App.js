import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import EmailLogin from './components/auth/EmailLogin';
import EmailSignup from './components/auth/EmailSignup';
import GoogleLogin from './components/auth/GoogleLogin';
import UserLoggedIn from './components/UserLoggedIn';

export default function App() {
    GoogleSignin.configure({
        webClientId: '639721758917-drqcq2m2kj4j05pb1fsage1qa6u4dbuq.apps.googleusercontent.com'
    });

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    // User signed-out view
    if (!user) {
        return (
            <View>
                <EmailSignup />
                <EmailLogin />
                <GoogleLogin />
            </View>
        );
    }

    // User logged-in view
    return (
        <UserLoggedIn user={user} />
    )
}

const styles = StyleSheet.create({

});
