import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import signInUserWithGoogle from '../../components/logic/auth/GoogleSignIn';
import ScreenAnimatingOnKeyboard from '../../components/ui/ScreenAnimatingOnKeyboard';
import EmailAuthenticationForm from '../../components/ui/auth/EmailAuthenticationForm';

export default function SignUpScreen({ navigation }) {
    return (
        <ScreenAnimatingOnKeyboard>
            <View style={styles.mainView}>
                <Text style={styles.welcomeText} variant="headlineMedium">
                    Sign up to myWallet
                </Text>
                <EmailAuthenticationForm mode='sign-up' />
                <Text style={styles.textBetween} variant="labelSmall">
                    OR
                </Text>
                <Button
                    mode="contained-tonal"
                    icon="google"
                    onPress={signInUserWithGoogle}
                >
                    Sign up with Google
                </Button>
            </View>
            <View style={styles.signInWrapper}>
                <Text>Already have an account?</Text>
                <Button
                    style={styles.signInButton}
                    onPress={() => {
                        navigation.navigate('Welcome');
                    }}
                >
                    Sign in
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
    signInWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 16,
    },
    signInButton: {
        marginTop: 8,
    },
});
