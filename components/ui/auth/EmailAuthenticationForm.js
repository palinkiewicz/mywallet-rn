import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import {
    AUTH_FORM_ERROR_INITIAL_STATE as initState,
    AUTH_FORM_MODES as modes,
} from '../../../constants';
import signInUserWithEmail from '../../logic/auth/EmailSignIn';
import createNewUser from '../../logic/auth/EmailSignUp';

/**
 * A functional component that returns the appropriate authentication form,
 * depending on the mode provided as a prop.
 */
export default function EmailAuthenticationForm({ mode = modes.SIGN_IN }) {
    const [dataEntered, setDataEntered] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState(initState);

    const onProceedButton = async () => {
        let updatedErrors = {};

        if (mode === modes.SIGN_IN) {
            updatedErrors = await signInUserWithEmail(
                dataEntered.email,
                dataEntered.password
            );
        } else if (mode === modes.SIGN_UP) {
            updatedErrors = await createNewUser(
                dataEntered.email,
                dataEntered.password,
                dataEntered.confirmPassword
            );
        } else {
            console.error("EmailAuthenticationForm's mode prop is invalid");
        }

        setErrors(updatedErrors);
    };

    const onChangeInputText = (key, text) => {
        let updatedObject = {};
        updatedObject[key] = text;

        setDataEntered((current) => ({
            ...current,
            ...updatedObject,
        }));

        if (key in errors) {
            let errorsUpdatedObject = {};
            errorsUpdatedObject[key] = {
                active: false,
                msg: errors[key].msg,
            };

            setErrors((current) => ({
                ...current,
                ...errorsUpdatedObject,
            }));
        }
    };

    return (
        <View style={styles.signUpWrapper}>
            <TextInput
                style={styles.textInput}
                label="Email"
                onChangeText={(text) => {
                    onChangeInputText('email', text);
                }}
                value={dataEntered.email}
                error={errors.email.active ? true : false}
            />
            <HelperText
                type="error"
                visible={errors.email.active ? true : false}
            >
                {errors.email.msg}
            </HelperText>
            <TextInput
                style={styles.textInput}
                label="Password"
                secureTextEntry
                onChangeText={(text) => {
                    onChangeInputText('password', text);
                }}
                value={dataEntered.password}
                error={errors.password.active ? true : false}
            />
            <HelperText
                type="error"
                visible={errors.password.active ? true : false}
            >
                {errors.password.msg}
            </HelperText>
            {mode === modes.SIGN_UP && (
                <>
                    <TextInput
                        style={styles.textInput}
                        label="Confirm password"
                        secureTextEntry
                        onChangeText={(text) => {
                            onChangeInputText('confirmPassword', text);
                        }}
                        value={dataEntered.confirmPassword}
                        error={errors.confirmPassword.active ? true : false}
                    />
                    <HelperText
                        type="error"
                        visible={errors.confirmPassword.active ? true : false}
                    >
                        {errors.confirmPassword.msg}
                    </HelperText>
                </>
            )}
            <Button
                style={styles.signUpButton}
                mode="contained"
                onPress={onProceedButton}
            >
                {mode === modes.SIGN_UP ? 'Sign up' : 'Sign in'}
            </Button>
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
