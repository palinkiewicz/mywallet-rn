import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import TextInputWithError from '../TextInputWithError';
import { AUTH_MODES as modes } from '../../../constants';
import { signInUserWithEmail } from '../../logic/firestore/auth/EmailSignIn';
import { createNewUser } from '../../logic/firestore/auth/EmailSignUp';
import ButtonDisabledOnError from '../ButtonDisabledOnError';

/**
 * A functional component that returns the appropriate authentication form,
 * depending on the mode provided as a prop.
 */
export default function EmailAuthenticationForm({ mode = modes.SIGN_IN }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [passwordShown, setPasswordShown] = useState(false);

    const onProceedButton = async () => {
        let newErrors = {
            ...errors,
            email: email.trim() === '' ? 'Please provide an email' : '',
            password: password.trim() === '' ? 'Please provide a password' : '',
            confirmPassword:
                confirmPassword.trim() === '' && mode === modes.SIGN_UP ? 'Please rewrite the password' : '',
        };

        setErrors(newErrors);

        if (Object.values(newErrors)?.filter((err) => err !== '').length === 0) {
            if (mode === modes.SIGN_IN) {
                const firebaseErrors = await signInUserWithEmail(email, password);
                setErrors({ ...errors, ...firebaseErrors });
            } else if (mode === modes.SIGN_UP) {
                const firebaseErrors = await createNewUser(email, password, confirmPassword);
                setErrors({ ...errors, ...firebaseErrors });
            }
        }
    };

    const onChangeEmail = (text) => {
        setEmail(text);
        setErrors({
            ...errors,
            email: text.trim() === '' ? 'Please provide an email' : '',
        });
    };

    const onChangePassword = (text) => {
        setPassword(text);
        setErrors({
            ...errors,
            password: text.trim() === '' ? 'Please provide a password' : '',
        });
    };

    const onChangeConfirmPassword = (text) => {
        setConfirmPassword(text);
        setErrors({
            ...errors,
            confirmPassword: text.trim() === '' && mode === modes.SIGN_UP ? 'Please rewrite the password' : '',
        });
    };

    const onClickShowPassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <View style={styles.signUpWrapper}>
            <TextInputWithError
                style={styles.textInput}
                label="Email"
                onChangeText={onChangeEmail}
                value={email}
                error={errors.email}
            />
            <TextInputWithError
                style={styles.textInput}
                label="Password"
                secureTextEntry={mode === modes.SIGN_IN && passwordShown ? false : true}
                right={
                    mode === modes.SIGN_IN && (
                        <TextInput.Icon icon={passwordShown ? 'eye-off' : 'eye'} onPress={onClickShowPassword} />
                    )
                }
                onChangeText={onChangePassword}
                value={password}
                error={errors.password}
            />
            {mode === modes.SIGN_UP && (
                <TextInputWithError
                    style={styles.textInput}
                    label="Confirm password"
                    secureTextEntry
                    onChangeText={onChangeConfirmPassword}
                    value={confirmPassword}
                    error={errors.confirmPassword}
                />
            )}
            <ButtonDisabledOnError
                style={styles.signUpButton}
                mode="contained"
                onPress={onProceedButton}
                errors={errors}
            >
                {mode === modes.SIGN_UP ? 'Sign up' : 'Sign in'}
            </ButtonDisabledOnError>
        </View>
    );
}

const styles = StyleSheet.create({
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
});
