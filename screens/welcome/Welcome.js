import { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Keyboard,
    Dimensions,
    StatusBar,
} from 'react-native';
import { Text, Button, TextInput, HelperText } from 'react-native-paper';
import logInUserWithGoogle from '../../components/auth/GoogleLogin';
import logInUserWithEmail from '../../components/auth/EmailLogin';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export default function WelcomeScreen({ navigation }) {
    const [emailEntered, setEmailEntered] = useState('');
    const [emailErrorOccured, setEmailErrorOccured] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [passwordEntered, setPasswordEntered] = useState('');
    const [passwordErrorOccured, setPasswordErrorOccured] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState('');

    const onSignInButton = async () => {
        let errors = await logInUserWithEmail(emailEntered, passwordEntered);
        if (errors) handleLogInWithEmailError(errors);
    };

    const handleLogInWithEmailError = (errors) => {
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
            }
        });
    };

    // //
    // Animating view when showing the keyboard
    var windowHeight = Dimensions.get('window').height;
    // If divice has notch, status bar height must be added to windowHeight
    if (StatusBar.currentHeight > 24) windowHeight += StatusBar.currentHeight;

    const viewHeight = useSharedValue(windowHeight);
    const viewAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: viewHeight.value,
        };
    }, []);

    useEffect(() => {
        const showSubscription = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                viewHeight.value = withTiming(
                    windowHeight - e.endCoordinates.height,
                    { duration: 140 }
                );
            }
        );

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            viewHeight.value = withTiming(windowHeight, { duration: 140 });
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    // //
    // Screen display
    return (
        <Animated.View style={viewAnimatedStyle}>
            <View style={styles.mainView}>
                <Text style={styles.welcomeText} variant="headlineMedium">
                    Welcome to myWallet
                </Text>
                <View style={styles.signInWrapper}>
                    <TextInput
                        style={styles.textInput}
                        label="Email"
                        onChangeText={(text) => {
                            setEmailErrorOccured(false);
                            setEmailEntered(text);
                        }}
                        error={emailErrorOccured}
                        value={emailEntered}
                    />
                    <HelperText type="error" visible={emailErrorOccured}>
                        {emailHelperText}
                    </HelperText>
                    <TextInput
                        style={styles.textInput}
                        label="Password"
                        secureTextEntry
                        right={<TextInput.Icon icon="eye" />}
                        onChangeText={(text) => {
                            setPasswordErrorOccured(false);
                            setPasswordEntered(text);
                        }}
                        error={passwordErrorOccured}
                        value={passwordEntered}
                    />
                    <HelperText type="error" visible={passwordErrorOccured}>
                        {passwordHelperText}
                    </HelperText>
                    <Button
                        style={styles.signInButton}
                        mode="contained"
                        onPress={onSignInButton}
                    >
                        Sign in
                    </Button>
                </View>
                <Text style={styles.textBetween} variant="labelSmall">
                    OR
                </Text>
                <Button
                    mode="contained-tonal"
                    icon="google"
                    onPress={logInUserWithGoogle}
                >
                    Login with Google
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
        </Animated.View>
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
    signInWrapper: {
        alignItems: 'stretch',
        width: '80%',
    },
    textInput: {
        marginTop: 8,
    },
    signInButton: {
        marginTop: 8,
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
