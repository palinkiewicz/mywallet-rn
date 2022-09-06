import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput, HelperText } from 'react-native-paper';
import createNewUser from '../../components/auth/EmailSignUp';

export default function SignUpScreen({ navigation }) {
    const [emailEntered, setEmailEntered] = useState('');
    const [emailErrorOccured, setEmailErrorOccured] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [passwordEntered, setPasswordEntered] = useState('');
    const [passwordErrorOccured, setPasswordErrorOccured] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState('');
    const [confirmPassEntered, setConfirmPassEntered] = useState('');
    const [confirmPassErrorOccured, setConfirmPassErrorOccured] =
        useState(false);
    const [confirmPassHelperText, setConfirmPassHelperText] = useState('');

    const onSignUpButton = async () => {
        let errors = await createNewUser(
            emailEntered,
            passwordEntered,
            confirmPassEntered
        );
        if (errors) handleSignUpWithEmailError(errors);
    };

    const handleSignUpWithEmailError = (errors) => {
        errors.forEach((errorData) => {
            switch (errorData.type) {
                case 'email':
                    setEmailErrorOccured(true);
                    setEmailHelperText(errorData.msg);
                    return;
                case 'password':
                    setPasswordErrorOccured(true);
                    setPasswordHelperText(errorData.msg);
                    return;
                case 'confirmPassword':
                    setConfirmPassErrorOccured(true);
                    setConfirmPassHelperText(errorData.msg);
                    return;
            }
        });
    };

    return (
        <View style={[styles.screenWrapper]}>
            <View style={styles.mainView}>
                <Text style={styles.welcomeText} variant="headlineMedium">
                    Sign up to myWallet
                </Text>
                <View style={styles.signUpWrapper}>
                    <TextInput
                        style={styles.textInput}
                        label="Email"
                        onChangeText={(text) => {
                            setEmailErrorOccured(false);
                            setEmailEntered(text);
                        }}
                        value={emailEntered}
                        error={emailErrorOccured}
                    />
                    <HelperText type="error" visible={emailErrorOccured}>
                        {emailHelperText}
                    </HelperText>
                    <TextInput
                        style={styles.textInput}
                        label="Password"
                        secureTextEntry
                        onChangeText={(text) => {
                            setPasswordErrorOccured(false);
                            setPasswordEntered(text);
                        }}
                        value={passwordEntered}
                        error={passwordErrorOccured}
                    />
                    <HelperText type="error" visible={passwordErrorOccured}>
                        {passwordHelperText}
                    </HelperText>
                    <TextInput
                        style={styles.textInput}
                        label="Confirm password"
                        secureTextEntry
                        onChangeText={(text) => {
                            setConfirmPassErrorOccured(false);
                            setConfirmPassEntered(text);
                        }}
                        value={confirmPassEntered}
                        error={confirmPassErrorOccured}
                    />
                    <HelperText type="error" visible={confirmPassErrorOccured}>
                        {confirmPassHelperText}
                    </HelperText>
                    <Button
                        style={styles.signUpButton}
                        mode="contained"
                        onPress={onSignUpButton}
                    >
                        Sign up
                    </Button>
                </View>
                <Text style={styles.textBetween} variant="labelSmall">
                    OR
                </Text>
                <Button mode="contained-tonal" icon="google" onPress={() => {}}>
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
        </View>
    );
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
        marginVertical: 24,
    },
    signUpWrapper: {
        alignItems: 'stretch',
        width: '80%',
    },
    textInput: {
        marginTop: 8,
    },
    signUpButton: {
        marginTop: 8,
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
