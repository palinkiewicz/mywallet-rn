import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from './components/logic/auth/UserContext';

import { SCREEN_NAMES } from './constants';
import HomeScreen from './screens/Home';
import { SignInScreen, SignUpScreen } from './screens/Authentication';

import PaperNavigationBar from './components/ui/PaperNavigationBar';

const Stack = createStackNavigator();

export default function App() {
    GoogleSignin.configure({
        webClientId:
            '639721758917-drqcq2m2kj4j05pb1fsage1qa6u4dbuq.apps.googleusercontent.com',
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

    return (
        <PaperProvider theme={DefaultTheme}>
            <UserContext.Provider value={user}>
                <NavigationContainer theme={DefaultTheme}>
                    <Stack.Navigator
                        initialRouteName={SCREEN_NAMES.HOME}
                        screenOptions={{
                            header: (props) => (
                                <PaperNavigationBar {...props} />
                            ),
                        }}
                    >
                        {!user ? (
                            <>
                                <Stack.Screen
                                    name={SCREEN_NAMES.SIGN_IN}
                                    component={SignInScreen}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name={SCREEN_NAMES.SIGN_UP}
                                    component={SignUpScreen}
                                    options={{ headerShown: false }}
                                />
                            </>
                        ) : (
                            <>
                                <Stack.Screen
                                    name={SCREEN_NAMES.HOME}
                                    component={HomeScreen}
                                />
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </UserContext.Provider>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({});
