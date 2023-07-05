import firestore from '@react-native-firebase/firestore';

/**
 * A function that returns a Firestore subscription,
 * in which it searches for every cash account associated with the provided userId
 * and sets a state value to the collected data using the provided setAccounts setter.
 *
 * Should be used inside the useEffect hook.
 */
export function getCashAccounts(user, setAccounts) {
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
                    let accountData = doc.data();
                    accountData.history.sort((a, b) => b.date - a.date);

                    accounts.push({ id: doc.id, data: accountData });
                });

                setAccounts(accounts);
            },
        });

    return subscriber;
}
