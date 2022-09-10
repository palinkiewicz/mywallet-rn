import auth from '@react-native-firebase/auth';
import { AUTH_FORM_ERROR_INITIAL_STATE as initState } from '../../../constants';

/**
 * A function that attempts to sign in a user with the Firebase Auth,
 * using the email and password provided as arguments,
 * and returns errors if any.
 */
export default async function signInUserWithEmail(email, password) {
    let errors = {};

    // Checking is all the data is provided.
    if (email == '')
        errors.email = { active: true, msg: 'Please provide an email.' };
    if (password == '')
        errors.password = { active: true, msg: 'Please provide a password.' };

    if (Object.keys(errors).length !== 0) return { ...initState, ...errors };

    // Calling the Firebase function that checks if arguments are valid and signs in a user.
    await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User signed in!');
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/user-disabled':
                    return (errors.email = {
                        active: true,
                        msg: 'This account has been disabled.',
                    });
                case 'auth/user-not-found':
                    return (errors.email = {
                        active: true,
                        msg: 'There is no such a user.',
                    });
                case 'auth/invalid-email':
                    return (errors.email = {
                        active: true,
                        msg: 'That email address is invalid!',
                    });
                case 'auth/wrong-password':
                    return (errors.password = {
                        active: true,
                        msg: 'The password is invalid.',
                    });
                default:
                    console.error(error.code);
            }
        });

    // Returning errors if any, otherwise returning false as an indicator that there were no errors.
    if (Object.keys(errors).length !== 0) return { ...initState, ...errors };
    else return initState;
}
