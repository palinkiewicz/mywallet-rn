import { useContext, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { DataContext } from '../components/logic/DataContext';
import LazyLoadingContent from '../components/ui/LazyLoadingContent';
import AccountCard from '../components/ui/accounts/AccountCard';
import AccountRemoveDialog from '../components/ui/accounts/AccountRemoveDialog';

export default function AccountsScreen({ navigation }) {
    const accountsData = useContext(DataContext).accounts;

    const getAccountAmount = (accountHistory) => {
        let amount = 0;
        accountHistory.map((record) => (amount += record.value));
        return String(amount);
    };

    const [fabExtended, setFabExtended] = useState(false);

    const onScroll = ({ nativeEvent }) => {
        setFabExtended((Math.floor(nativeEvent?.contentOffset?.y) ?? 0) <= 0);
    };

    const [removeData, setRemoveData] = useState({
        active: false,
        accountId: null,
    });

    return (
        <>
            <LazyLoadingContent callback={() => setFabExtended(true)}>
                <FlatList
                    contentContainerStyle={styles.cardContainer}
                    data={accountsData}
                    renderItem={(account) => (
                        <AccountCard
                            id={account.item.id}
                            title={account.item.data.name}
                            icon={account.item.data.icon}
                            amount={getAccountAmount(account.item.data.history)}
                            setRemoveData={setRemoveData}
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
            <AccountRemoveDialog
                removeData={removeData}
                setRemoveData={setRemoveData}
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
