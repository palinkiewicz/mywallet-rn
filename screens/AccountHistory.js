import { useContext, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { DataContext } from '../components/logic/DataContext';
import LazyLoadingContent from '../components/ui/LazyLoadingContent';
import HistoryRecordCard from '../components/ui/accounts/HistoryRecordCard';

export default function AccountHistoryScreen({ navigation, route }) {
    const { accountId } = route.params;
    const accountsData = useContext(DataContext).accounts;
    const selectedAccountData = accountsData.find(
        (item) => item.id === accountId
    ).data;

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
                    contentContainerStyle={styles.cardContainer}
                    data={selectedAccountData.history}
                    renderItem={({ item, index }) => (
                        <HistoryRecordCard
                            name={item.name}
                            value={item.value}
                            date={item.date}
                            index={index}
                            setRemoveData={setRemoveData}
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
