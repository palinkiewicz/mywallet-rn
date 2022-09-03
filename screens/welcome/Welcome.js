import { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Dimensions, StatusBar } from 'react-native'
import { Text, Button, TextInput, HelperText } from 'react-native-paper';
import logInUserWithGoogle from '../../components/auth/GoogleLogin';
import logInUserWithEmail from '../../components/auth/EmailLogin';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function WelcomeScreen({ navigation }) {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    // //
    // Displaying errors that occured while trying to sign in
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

    // //
    // Animating view when showing the keyboard
    var windowHeight = Dimensions.get('window').height;
    // If divice has notch, status bar height must be added to windowHeight
    if (StatusBar.currentHeight > 24) windowHeight += StatusBar.currentHeight;
    const viewHeight = useSharedValue(windowHeight);

    const viewAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: viewHeight.value
        };
    }, [viewHeight]);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
            viewHeight.value = withTiming(windowHeight - e.endCoordinates.height, {duration: 140});
        });

        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            viewHeight.value = withTiming(windowHeight, {duration: 140});
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    // //
    // Screen display
    return (
        <Animated.View style={[styles.screenWrapper, viewAnimatedStyle]}>
            <View style={styles.mainView}>
                <Text style={styles.welcomeText} variant='headlineMedium'>Welcome to myWallet</Text>
                <View style={styles.signInWrapper}>
                    <TextInput
                        style={styles.textInput}
                        label='Email'
                        onChangeText={(text) => {
                            setEmailErrorOccured(false);
                            setEnteredEmail(text);
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
                            setPasswordErrorOccured(false);
                            setEnteredPassword(text);
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
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    screenWrapper: {

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
