import auth from '@react-native-firebase/auth';

/**
 * A function that attempts to sign in a user with the Firebase Auth,
 * using the email and password provided as arguments,
 * and returns errors if any.
 */
export default async function logInUserWithEmail(email, password) {
    let errors = [];

    // Checking is all the data is provided.
    if (email == '')
        errors.push({ type: 'email', msg: 'Please provide an email.' });
    if (password == '')
        errors.push({ type: 'password', msg: 'Please provide a password.' });

    if (Object.keys(errors).length !== 0) return errors;

    // Calling the Firebase function that checks if arguments are valid and signs in a user.
    await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User signed in!');
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/user-disabled':
                    return errors.push({
                        type: 'email',
                        msg: 'This account has been disabled.',
                    });
                case 'auth/user-not-found':
                    return errors.push({
                        type: 'email',
                        msg: 'There is no such a user.',
                    });
                case 'auth/invalid-email':
                    return errors.push({
                        type: 'email',
                        msg: 'That email address is invalid!',
                    });
                case 'auth/wrong-password':
                    return errors.push({
                        type: 'password',
                        msg: 'The password is invalid.',
                    });
                default:
                    console.error(error.code);
            }
        });

    // Returning errors if any, otherwise returning false as an indicator that there were no errors.
    if (Object.keys(errors).length !== 0) return errors;
    else return false;
}
