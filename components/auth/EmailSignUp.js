import auth from '@react-native-firebase/auth';

/**
 * A function that attempts to create a new user in the Firebase Auth,
 * using the email and password provided as arguments,
 * and returns errors if any.
 */
export default async function createNewUser(email, password, confirmPassword = null) {
    let errors = [];

    // Checking is all the data is provided.
    if (email === '')
        errors.push({ type: 'email', msg: 'Please provide an email.' });

    if (password === '')
        errors.push({ type: 'password', msg: 'Please provide a password.' });

    if (confirmPassword !== null) {
        if (confirmPassword === '')
            errors.push({
                type: 'confirmPassword',
                msg: 'Please rewrite the password provided above.',
            });
        else if (password !== confirmPassword)
            errors.push({
                type: 'confirmPassword',
                msg: 'Passwords are not the same.',
            });
    }

    if (Object.keys(errors).length !== 0) return errors;

    // Calling the Firebase function that checks if arguments are valid, and creates a new user in Auth.
    await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/invalid-email':
                    return errors.push({
                        type: 'email',
                        msg: 'That email address is invalid!',
                    });
                case 'auth/email-already-in-use':
                    return errors.push({
                        type: 'email',
                        msg: 'The email address is already in use!',
                    });
                case 'auth/weak-password':
                    return errors.push({
                        type: 'password',
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
    if (Object.keys(errors).length !== 0) return errors;
    else return false;
}
