import firestore from '@react-native-firebase/firestore';

/**
 * A function that returns a Firestore subscription,
 * in which it searches for every cash account associated with the provided userId
 * and sets a state value to the collected data using the provided setAccounts setter.
 *
 * Should be used inside the useEffect hook.
 */
export default function getCashAccounts(user, setAccounts) {
    const subscriber = firestore()
        .collection('Accounts')
        .where('user_id', '==', user.uid)
        .orderBy('date_created', 'asc')
        .onSnapshot({
            error: (e) => {
                /**
                 * [firestore/permission-denied] appears somehow, but it doesn't break anything. (See #11)
                 */
                console.log(e.message);
            },
            next: (querySnapshot) => {
                const accounts = [];

                querySnapshot.forEach((doc) => {
                    accounts.push({id: doc.id, data: doc.data()});
                });

                setAccounts(accounts);
            },
        });

    return subscriber;
}
