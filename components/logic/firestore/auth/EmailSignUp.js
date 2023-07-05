import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';

export async function createNewUser(email, password, confirmPassword = null) {
    if (password !== confirmPassword) {
        return { confirmPassword: 'Passwords are not the same' };
    }

    let errors = {};

    await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch((error) => {
            ToastAndroid.show('Try again', ToastAndroid.SHORT);

            switch (error.code) {
                case 'auth/invalid-email':
                    errors = { email: 'Invalid email address' };
                    break;
                case 'auth/email-already-in-use':
                    errors = { email: 'Already in use' };
                    break;
                case 'auth/weak-password':
                    errors = { email: 'Too weak' };
                    break;
                case 'auth/operation-not-allowed':
                    errors = { email: 'Email accounts are not enabled' };
                    break;
                default:
                    console.error(error.code);
                    ToastAndroid.show(error.code, ToastAndroid.SHORT);
            }
        });

    return errors;
}
