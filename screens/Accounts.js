import { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import LazyLoadingContent from '../components/ui/LazyLoadingContent';
import AccountCard from '../components/ui/accounts/AccountCard';

export default function AccountsScreen({ navigation }) {
    const [fabExtended, setFabExtended] = useState(false);

    const onScroll = ({ nativeEvent }) => {
        setFabExtended((Math.floor(nativeEvent?.contentOffset?.y) ?? 0) <= 0);
    };

    const data = [
        {
            name: 'Account',
            amount: '600.00',
            icon: 'currency-usd',
            id: '1222223',
        },
        {
            name: 'Bank account',
            amount: '1600.00',
            icon: 'bank',
            id: '123',
        },
        {
            name: 'Wallet',
            amount: '500.00',
            icon: 'wallet',
            id: '12633',
        },
        {
            name: 'Piggy bank',
            amount: '16.23',
            icon: 'piggy-bank',
            id: '1923',
        },
    ];

    return (
        <>
            <LazyLoadingContent callback={() => setFabExtended(true)}>
                <FlatList
                    contentContainerStyle={styles.cardContainer}
                    data={data}
                    renderItem={(accountData) => (
                        <AccountCard
                            title={accountData.item.name}
                            amount={accountData.item.amount}
                            icon={accountData.item.icon}
                        />
                    )}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    onScroll={onScroll}
                />
            </LazyLoadingContent>
            <AnimatedFAB
                icon="plus"
                label="New account"
                extended={fabExtended}
                onPress={() => {}}
                style={styles.fabStyle}
            />
        </>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        paddingBottom: 80,
    },
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },
});
