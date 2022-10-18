import { useContext, useState } from 'react';
import { FlatList } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { DataContext } from '../components/logic/DataContext';
import LazyLoadingContent from '../components/ui/LazyLoadingContent';
import { removeCashAccountHistory } from '../components/logic/accounts/RemoveCashAccountHistory';
import DeleteDialog from '../components/ui/DeleteDialog';
import HistoryRecordCard from '../components/ui/accounts/HistoryRecordCard';
import { SCREENS_NAMES } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AccountHistoryScreen({ navigation, route }) {
    const { accountId } = route.params;
    const accountsData = useContext(DataContext).accounts;
    const selectedAccountData = accountsData.find(
        (item) => item.id === accountId
    ).data;

    const { bottom } = useSafeAreaInsets();

    const [fabExtended, setFabExtended] = useState(false);

    const onScroll = ({ nativeEvent }) => {
        setFabExtended((Math.floor(nativeEvent?.contentOffset?.y) ?? 0) <= 0);
    };

    const [removeData, setRemoveData] = useState({
        accountId: accountId,
        index: null,
        history: selectedAccountData.history,
        active: false,
    });

    return (
        <>
            <LazyLoadingContent callback={() => setFabExtended(true)}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 80 + bottom }}
                    data={selectedAccountData.history}
                    renderItem={({ item, index }) => (
                        <HistoryRecordCard
                            accountId={accountId}
                            name={item.name}
                            value={item.value.toFixed(2)}
                            date={item.date}
                            index={index}
                            fullHistory={selectedAccountData.history}
                            setRemoveData={setRemoveData}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={(item, index) => {
                        return `${accountId}-${index}`;
                    }}
                    onScroll={onScroll}
                />
            </LazyLoadingContent>
            <AnimatedFAB
                icon="plus"
                label="New record"
                extended={fabExtended}
                onPress={() => {
                    navigation.navigate(SCREENS_NAMES.addAccountHistory, {
                        accountId: accountId,
                    });
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
                    removeCashAccountHistory(
                        removeData.accountId,
                        removeData.index,
                        removeData.history
                    );
                }}
                paragraphs={[
                    'Record will be removed permamently.',
                    'You cannot recover it after this.'
                ]}
            />
        </>
    );
}
