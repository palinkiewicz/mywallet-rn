import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';

export async function signInUserWithEmail(email, password) {
    let errors = {};

    await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User signed in!');
        })
        .catch((error) => {
            ToastAndroid.show('Try again', ToastAndroid.SHORT);

            switch (error.code) {
                case 'auth/user-disabled':
                    errors = { email: 'This account has been disabled' };
                    break;
                case 'auth/user-not-found':
                    errors = { email: 'There is no such user' };
                    break;
                case 'auth/invalid-email':
                    errors = { email: 'Invalid email address' };
                    break;
                case 'auth/wrong-password':
                    errors = { password: 'The password is invalid' };
                    break;
                default:
                    console.error(error.code);
                    ToastAndroid.show(error.code, ToastAndroid.SHORT);
            }
        });

    return errors;
}
