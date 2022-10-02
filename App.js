import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import PaperNavigationBar from './components/ui/PaperNavigationBar';
import PaperDrawer from './components/ui/PaperDrawer';
import { MaterialYouTheme } from './components/MaterialYouTheme';
import { UserContext } from './components/logic/auth/UserContext';
import { DataContext } from './components/logic/DataContext';
import { AUTH_SCREENS, MAIN_SCREENS } from './screens/_ScreensData';
import getCashAccounts from './components/logic/accounts/GetCashAccounts';

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

    // Getting data from Firestore
    const [fsData, setFsData] = useState({});

    useEffect(() => {
        if (!user) return;

        const unsubscribe = getCashAccounts(user, (data) => {
            setFsData((current) => ({ ...current, accounts: data }));
        });

        return () => {
            unsubscribe();
        };
    }, [user]);

    if (initializing) return null;

    const Screens = () => {
        return (
            <DataContext.Provider value={fsData}>
                <Stack.Navigator
                    screenOptions={{
                        header: (props) => <PaperNavigationBar {...props} />,
                    }}
                >
                    {!user
                        ? AUTH_SCREENS.map((screen) => (
                            <Stack.Screen
                                key={screen.name}
                                name={screen.name}
                                component={screen.component}
                                options={{ headerShown: false }}
                            />
                        ))
                        : MAIN_SCREENS.map((screen) => (
                            <Stack.Screen
                                key={screen.name}
                                name={screen.name}
                                component={screen.component}
                            />
                        ))}
                </Stack.Navigator>
            </DataContext.Provider>
        );
    };

    return (
        <PaperProvider theme={MaterialYouTheme}>
            <UserContext.Provider value={user}>
                <NavigationContainer theme={MaterialYouTheme}>
                    <Drawer.Navigator
                        screenOptions={{
                            drawerStyle: styles.drawer,
                            headerShown: false,
                            swipeEnabled: !user ? false : true,
                        }}
                        drawerContent={(props) => (
                            <PaperDrawer
                                {...props}
                                colors={MaterialYouTheme.colors}
                            />
                        )}
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

const styles = StyleSheet.create({
    drawer: {
        backgroundColor: MaterialYouTheme.colors.surface,
        width: '80%',
    },
});
