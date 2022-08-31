import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Provider as PaperProvider, Appbar, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home';
import WelcomeScreen from './screens/Welcome';

import PaperNavigationBar from './components/PaperNavigationBar';
import EmailLogin from './components/auth/EmailLogin';
import EmailSignup from './components/auth/EmailSignup';
import GoogleLogin from './components/auth/GoogleLogin';
import UserLoggedIn from './components/UserLoggedIn';

const Stack = createStackNavigator();

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

    const AuthAppView = () => {
        // User signed-out view
        if (!user) {
            return (
                <View>
                    <EmailSignup />
                    {/* <EmailLogin />
                    <GoogleLogin /> */}
                </View>
            );
        }

        // User logged-in view
        return (
            <UserLoggedIn user={user} />
        );
    }

    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={ user ? 'Home' : 'Welcome' }
                    screenOptions={{
                        header: (props) => <PaperNavigationBar {...props} />,
                    }}>
                    <Stack.Screen name='Home' component={HomeScreen} />
                    <Stack.Screen name='Welcome' component={WelcomeScreen} options={{headerShown: false}} />
                </Stack.Navigator>
            </NavigationContainer>
            <StatusBar translucent backgroundColor="transparent" barStyle='dark-content' />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({

});
