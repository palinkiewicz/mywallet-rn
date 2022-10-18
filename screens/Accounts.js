import { useContext, useState } from 'react';
import { FlatList } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { DataContext } from '../components/logic/DataContext';
import LazyLoadingContent from '../components/ui/LazyLoadingContent';
import removeCashAccount from '../components/logic/accounts/RemoveCashAccount';
import DeleteDialog from '../components/ui/DeleteDialog';
import AccountCard from '../components/ui/accounts/AccountCard';
import { SCREENS_NAMES } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AccountsScreen({ navigation }) {
    const accountsData = useContext(DataContext).accounts;
    const { bottom } = useSafeAreaInsets();

    const getAccountAmount = (accountHistory) => {
        let amount = 0;
        accountHistory.map((record) => (amount += record.value));
        return amount;
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
                    contentContainerStyle={{ paddingBottom: 80 + bottom }}
                    data={accountsData}
                    renderItem={(account) => (
                        <AccountCard
                            id={account.item.id}
                            title={account.item.data.name}
                            icon={account.item.data.icon}
                            amount={getAccountAmount(
                                account.item.data.history
                            ).toFixed(2)}
                            setRemoveData={setRemoveData}
                            navigation={navigation}
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
                onPress={() => {
                    navigation.navigate(SCREENS_NAMES.addAccount);
                }}
                style={{
                    bottom: 16 + bottom,
                    right: 16,
                    position: 'absolute',
                }}
            />
            <DeleteDialog
                removeData={removeData}
                setRemoveData={setRemoveData}
                onConfirm={() => {
                    removeCashAccount(removeData.accountId);
                }}
                paragraphs={[
                    'Account will be removed permamently.',
                    'You cannot recover the account and all its records after this.',
                ]}
            />
        </>
    );
}
