import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialYouTheme } from './components/MaterialYouTheme';
import { UserContext } from './components/logic/auth/UserContext';
import PaperNavigationBar from './components/ui/PaperNavigationBar';
import PaperDrawer from './components/ui/PaperDrawer';

import { SCREEN_NAMES } from './constants';
import { SignInScreen, SignUpScreen } from './screens/Authentication';
import HomeScreen from './screens/Home';

const Drawer = createDrawerNavigator();
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

    const Screens = () => {
        return (
            <Stack.Navigator
                screenOptions={{
                    header: (props) => <PaperNavigationBar {...props} />,
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
        );
    };

    return (
        <PaperProvider theme={MaterialYouTheme}>
            <UserContext.Provider value={user}>
                <NavigationContainer theme={MaterialYouTheme}>
                    <Drawer.Navigator
                        screenOptions={{
                            drawerStyle: {
                                backgroundColor:
                                    MaterialYouTheme.colors.surface,
                                width: '80%',
                            },
                            headerShown: false,
                            swipeEnabled: !user ? false : true,
                        }}
                        drawerContent={(props) => <PaperDrawer {...props} />}
                    >
                        <Drawer.Screen name="Screens" component={Screens} />
                    </Drawer.Navigator>
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
