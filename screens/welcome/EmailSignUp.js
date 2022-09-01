import { View, StyleSheet } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper';

export default function EmailSignUpScreen({ navigation }) {
    return (
        <View style={[styles.screenWrapper]}>
            <View style={styles.mainView}>
                <Text style={styles.welcomeText}>Sign up to myWallet</Text>
                <View style={{alignItems: 'stretch', width: '70%'}}>
                    <TextInput style={styles.textInput} mode="outlined" label='Email' />
                    <TextInput style={styles.textInput} mode="outlined" label='Password' />
                    <TextInput style={styles.textInput} mode="outlined" label='Confirm password' />
                    <Button mode='contained' onPress={() => navigation.navigate('Home')}>Sign up</Button>
                </View>
                <Text style={styles.textBetween}>OR</Text>
                <Button mode='contained-tonal' icon='google' onPress={() => {}}>Sign up with Google</Button>
            </View>
            <View style={styles.signUpWrapper}>
                <Text>Already have an account?</Text>
                <Button style={styles.signInButton} onPress={() => {navigation.navigate('Welcome')}}>Sign in</Button>
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
    signInButton: {
        marginTop: 8
    },
});
