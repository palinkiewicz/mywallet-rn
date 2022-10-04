import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function HomeScreen({ navigation, route }) {
    const { darkTheme } = route.params;

    function signOut() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    return (
        <View style={{ margin: 16, alignItems: 'center' }}>
            <Button
                mode="outlined"
                style={styles.button}
                onPress={() => darkTheme.set((current) => !current)}
            >
                Toggle dark mode
            </Button>
            <Button
                style={styles.button}
                onPress={() => navigation.navigate('Accounts')}
            >
                Accounts
            </Button>
            <Button style={styles.button} onPress={signOut}>
                Sign out
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 8,
    },
});
