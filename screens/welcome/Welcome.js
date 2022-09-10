import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import signInUserWithGoogle from '../../components/logic/auth/GoogleSignIn';
import ScreenAnimatingOnKeyboard from '../../components/ui/ScreenAnimatingOnKeyboard';
import EmailAuthenticationForm from '../../components/ui/auth/EmailAuthenticationForm';

export default function WelcomeScreen({ navigation }) {
    return (
        <ScreenAnimatingOnKeyboard>
            <View style={styles.mainView}>
                <Text style={styles.welcomeText} variant="headlineMedium">
                    Welcome to myWallet
                </Text>
                <EmailAuthenticationForm mode='sign-in' />
                <Text style={styles.textBetween} variant="labelSmall">
                    OR
                </Text>
                <Button
                    mode="contained-tonal"
                    icon="google"
                    onPress={signInUserWithGoogle}
                >
                    Sign in with Google
                </Button>
            </View>
            <View style={styles.signUpWrapper}>
                <Text>Don't have an account?</Text>
                <Button
                    style={styles.signUpButton}
                    onPress={() => {
                        navigation.navigate('Sign up');
                    }}
                >
                    Sign up now
                </Button>
            </View>
        </ScreenAnimatingOnKeyboard>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        marginVertical: 24,
    },
    textBetween: {
        paddingVertical: 16,
    },
    signUpWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 16,
    },
    signUpButton: {
        marginTop: 8,
    },
});
