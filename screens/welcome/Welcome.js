import { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Text, Button, TextInput, HelperText } from 'react-native-paper';
import logInUserWithGoogle from '../../components/auth/GoogleLogin';
import logInUserWithEmail from '../../components/auth/EmailLogin';

export default function WelcomeScreen({ navigation }) {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const [emailErrorOccured, setEmailErrorOccured] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [passwordErrorOccured, setPasswordErrorOccured] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState('');

    const onSignInButton = async () => {
        let error = await logInUserWithEmail(enteredEmail, enteredPassword);
        if (error) handleLogInWithEmailError(error);
    }

    const handleLogInWithEmailError = (error) => {
        // Reset screen's error data
        setEmailErrorOccured(false);
        setPasswordErrorOccured(false);

        error.forEach(errorData => {
            switch (errorData.type) {
                case 'email':
                    setEmailErrorOccured(true);
                    setEmailHelperText(errorData.msg);
                    return;
                case 'password':
                    setPasswordErrorOccured(true);
                    setPasswordHelperText(errorData.msg);
                    return;
            }
        });
    }

    return (
        <View style={[styles.screenWrapper]}>
            <View style={styles.mainView}>
                <Text style={styles.welcomeText} variant='headlineMedium'>Welcome to myWallet</Text>
                <View style={styles.signInWrapper}>
                    <TextInput
                        style={styles.textInput}
                        label='Email'
                        onChangeText={(text) => {
                            setEnteredEmail(text)
                        }}
                        error={emailErrorOccured}
                        value={enteredEmail}
                    />
                    <HelperText type='error' visible={emailErrorOccured}>{emailHelperText}</HelperText>
                    <TextInput
                        style={styles.textInput}
                        label='Password'
                        secureTextEntry
                        right={<TextInput.Icon icon="eye"/>}
                        onChangeText={(text) => {
                            setEnteredPassword(text)
                        }}
                        error={passwordErrorOccured}
                        value={enteredPassword}
                    />
                    <HelperText type='error' visible={passwordErrorOccured}>{passwordHelperText}</HelperText>
                    <Button style={styles.signInButton} mode='contained' onPress={onSignInButton}>Sign in</Button>
                </View>
                <Text style={styles.textBetween} variant='labelSmall'>OR</Text>
                <Button mode='contained-tonal' icon='google' onPress={logInUserWithGoogle}>Login with Google</Button>
            </View>
            <View style={styles.signUpWrapper}>
                <Text>Don't have an account?</Text>
                <Button style={styles.signUpButton} onPress={() => {navigation.navigate('Sign up')}}>Sign up now</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
    },
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        marginVertical: 24
    },
    signInWrapper: {
        alignItems: 'stretch',
        width: '80%'
    },
    textInput: {
        marginTop: 8
    },
    signInButton: {
        marginTop: 8
    },
    textBetween: {
        paddingVertical: 16,
    },
    signUpWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 16
    },
    signUpButton: {
        marginTop: 8
    },
});
