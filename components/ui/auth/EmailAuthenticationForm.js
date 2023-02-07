import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import TextInputWithHelper from '../TextInputWithHelper';
import { AUTH_MODES as modes } from '../../../constants';
import { signInUserWithEmail } from '../../logic/auth/EmailSignIn';
import { createNewUser } from '../../logic/auth/EmailSignUp';
import getInitialErrorState from '../../logic/GetInitialErrorState';

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
    const [errors, setErrors] = useState(getInitialErrorState(['email', 'password', 'confirmPassword']));
    const [passwordShown, setPasswordShown] = useState(false);

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

        setErrors((prev) => {
            return { ...prev, ...updatedErrors };
        });
    };

    const onChangeInputText = (key, text) => {
        setDataEntered((current) => ({
            ...current,
            ...{ [key]: text },
        }));

        if (key in errors) {
            setErrors((current) => ({
                ...current,
                ...{
                    [key]: {
                        active: false,
                        msg: errors[key].msg,
                    },
                },
            }));
        }
    };

    return (
        <View style={styles.signUpWrapper}>
            <TextInputWithHelper
                style={styles.textInput}
                label="Email"
                onChangeText={(text) => {
                    onChangeInputText('email', text);
                }}
                value={dataEntered.email}
                error={errors.email.active ? true : false}
                helperVisible={errors.email.active ? true : false}
                helperText={errors.email.msg}
            />
            <TextInputWithHelper
                style={styles.textInput}
                label="Password"
                secureTextEntry={
                    mode === modes.SIGN_IN && passwordShown ? false : true
                }
                right={
                    mode === modes.SIGN_IN && (
                        <TextInput.Icon
                            icon={passwordShown ? 'eye-off' : 'eye'}
                            onPress={() => {
                                setPasswordShown(!passwordShown);
                            }}
                        />
                    )
                }
                onChangeText={(text) => {
                    onChangeInputText('password', text);
                }}
                value={dataEntered.password}
                error={errors.password.active ? true : false}
                helperVisible={errors.password.active ? true : false}
                helperText={errors.password.msg}
            />
            {mode === modes.SIGN_UP && (
                <>
                    <TextInputWithHelper
                        style={styles.textInput}
                        label="Confirm password"
                        secureTextEntry
                        onChangeText={(text) => {
                            onChangeInputText('confirmPassword', text);
                        }}
                        value={dataEntered.confirmPassword}
                        error={errors.confirmPassword.active ? true : false}
                        helperVisible={
                            errors.confirmPassword.active ? true : false
                        }
                        helperText={errors.confirmPassword.msg}
                    />
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
