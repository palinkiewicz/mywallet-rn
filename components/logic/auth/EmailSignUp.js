import auth from '@react-native-firebase/auth';
import { AUTH_FORM_ERROR_INITIAL_STATE as initState } from '../../../constants';

/**
 * A function that attempts to create a new user in the Firebase Auth,
 * using the email and password provided as arguments,
 * and returns errors if any.
 */
export default async function createNewUser(
    email,
    password,
    confirmPassword = null
) {
    let errors = {};

    // Checking is all the data is provided.
    if (email === '')
        errors.email = { active: true, msg: 'Please provide an email.' };

    if (password === '')
        errors.password = { active: true, msg: 'Please provide a password.' };

    if (confirmPassword !== null) {
        if (confirmPassword === '')
            errors.confirmPassword = {
                active: true,
                msg: 'Please rewrite the password provided above.',
            };
        else if (password !== confirmPassword)
            errors.confirmPassword = {
                active: true,
                msg: 'Passwords are not the same.',
            };
    }

    if (Object.keys(errors).length !== 0) return { ...initState, ...errors };

    // Calling the Firebase function that checks if arguments are valid, and creates a new user in Auth.
    await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/invalid-email':
                    return (errors.email = {
                        active: true,
                        msg: 'That email address is invalid!',
                    });
                case 'auth/email-already-in-use':
                    return (errors.email = {
                        active: true,
                        msg: 'The email address is already in use!',
                    });
                case 'auth/weak-password':
                    return (errors.password = {
                        active: true,
                        msg: 'The password is too weak!',
                    });
                case 'auth/operation-not-allowed':
                    return console.error(
                        'email/password accounts are not enabled'
                    );
                default:
                    return console.error(error.code);
            }
        });

    // Returning errors if any, otherwise returning false as an indicator that there were no errors.
    if (Object.keys(errors).length !== 0) return { ...initState, ...errors };
    else return initState;
}
