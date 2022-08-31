import { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper';
import logInUserWithGoogle from '../../components/auth/GoogleLogin';
import logInUserWithEmail from '../../components/auth/EmailLogin';

export default function WelcomeScreen({ navigation }) {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    return (
        <View style={[styles.screenWrapper]}>
            <View style={styles.mainView}>
                <Text style={styles.welcomeText}>Welcome to myWallet</Text>
                <View style={{alignItems: 'stretch', width: '70%'}}>
                    <TextInput
                        style={styles.textInput}
                        mode="outlined"
                        label='Email'
                        onChangeText={(text) => {
                            setEnteredEmail(text)
                        }}
                        value={enteredEmail}
                    />
                    <TextInput
                        style={styles.textInput}
                        mode="outlined"
                        label='Password'
                        secureTextEntry
                        right={<TextInput.Icon icon="eye"/>}
                        onChangeText={(text) => {
                            setEnteredPassword(text)
                        }}
                        value={enteredPassword}
                    />
                    <Button mode='contained' onPress={() => logInUserWithEmail(enteredEmail, enteredPassword)}>Sign in</Button>
                </View>
                <Text style={styles.textBetween}>OR</Text>
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
        fontSize: 24,
        marginVertical: 24
    },
    textInput: {
        marginBottom: 16
    },
    textBetween: {
        paddingVertical: 16,
        fontSize: 12,
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
