import auth from '@react-native-firebase/auth';

export default async function logInUserWithEmail(email, password) {
    if (email == '' && password == '') {
        return [
            { type: 'email', msg: 'Please provide an email.' },
            { type: 'password', msg: 'Please provide a password.' },
        ];
    } else if (email == '') {
        return [{ type: 'email', msg: 'Please provide an email.' }];
    } else if (password == '') {
        return [{ type: 'password', msg: 'Please provide a password.' }];
    }

    let toReturn = false;

    await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User signed in!');
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/user-disabled':
                    toReturn = [
                        {
                            type: 'email',
                            msg: 'This account has been disabled.',
                        },
                    ];
                    return;
                case 'auth/user-not-found':
                    toReturn = [
                        { type: 'email', msg: 'There is no such a user.' },
                    ];
                    return;
                case 'auth/invalid-email':
                    toReturn = [
                        {
                            type: 'email',
                            msg: 'That email address is invalid!',
                        },
                    ];
                    return;
                case 'auth/wrong-password':
                    toReturn = [
                        { type: 'password', msg: 'The password is invalid.' },
                    ];
                    return;
                default:
                    toReturn = error.code;
            }
        });

    if (toReturn) return toReturn;
    else return false;
}
