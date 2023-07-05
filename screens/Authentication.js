import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { signInUserWithGoogle } from '../components/logic/firestore/auth/GoogleSignIn';
import { AUTH_MODES as modes, AUTH_SCREENS_TEXTS as texts, SCREENS_NAMES as screens } from '../constants';
import ScreenAnimatingOnKeyboard from '../components/ui/ScreenAnimatingOnKeyboard';
import EmailAuthenticationForm from '../components/ui/auth/EmailAuthenticationForm';

/**
 * A screen that shows the appropriate authentication inputs, texts etc.,
 * depending on the mode provided as a prop.
 */
function AuthenticationScreen({ navigation, mode = modes.SIGN_IN }) {
    return (
        <ScreenAnimatingOnKeyboard>
            <View style={styles.mainView}>
                <Text style={styles.welcomeText} variant="headlineMedium">
                    {texts[mode].WELCOME}
                </Text>
                <EmailAuthenticationForm mode={mode} />
                <Text style={styles.textBetween} variant="labelSmall">
                    OR
                </Text>
                <Button mode="contained-tonal" icon="google" onPress={signInUserWithGoogle}>
                    {texts[mode].GOOGLE}
                </Button>
            </View>
            <View style={styles.signUpWrapper}>
                <Text>{texts[mode].INSTEAD_LABEL}</Text>
                <Button
                    style={styles.signUpButton}
                    onPress={() => {
                        navigation.navigate(mode === modes.SIGN_IN ? screens.sign_up : screens.sign_in);
                    }}
                >
                    {texts[mode].INSTEAD_BUTTON}
                </Button>
            </View>
        </ScreenAnimatingOnKeyboard>
    );
}

/**
 * Two exported functions using the AuthenticationScreen,
 * so it can be used as an actual React Navigation Screen.
 */
export function SignInScreen({ navigation }) {
    return <AuthenticationScreen mode={modes.SIGN_IN} navigation={navigation} />;
}

export function SignUpScreen({ navigation }) {
    return <AuthenticationScreen mode={modes.SIGN_UP} navigation={navigation} />;
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
