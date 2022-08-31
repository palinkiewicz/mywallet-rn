import auth from '@react-native-firebase/auth';

export default function logInUserWithEmail(email, password) {
    if (email == '') {
        return console.error('Please enter an email.')
    } else if (password == '') {
        return console.error('Please enter a password.')
    }

    auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User signed in!');
        })
        .catch(error => {
            if (error.code == 'auth/user-not-found') {
                console.log('User not found.')
            } else if (error.code == 'auth/wrong-password') {
                console.log('Wrong password.')
            } else if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error.code);
        });
}