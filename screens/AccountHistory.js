import { useContext, useState, useEffect } from 'react';
import { SectionList } from 'react-native';
import { AnimatedFAB, Text } from 'react-native-paper';
import { DataContext } from '../components/logic/DataContext';
import { removeCashAccountHistory } from '../components/logic/accounts/RemoveCashAccountHistory';
import DeleteDialog from '../components/ui/DeleteDialog';
import HistoryRecordCard from '../components/ui/accounts/HistoryRecordCard';
import { SCREENS_NAMES } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomNavigationBar from '../components/ui/PaperNavigationBar';
import HistoryRecordSectionHeader from '../components/ui/accounts/HistoryRecordSectionHeader';

export default function AccountHistoryScreen({ navigation, route }) {
    const { accountId, navbarMode } = route.params;
    const account = useContext(DataContext).accounts.find((item) => item.id === accountId).data;

    const { bottom } = useSafeAreaInsets();

    const [fabExtended, setFabExtended] = useState(false);

    const onScroll = ({ nativeEvent }) => {
        setFabExtended((Math.floor(nativeEvent?.contentOffset?.y) ?? 0) <= 0);
    };

    const [removeData, setRemoveData] = useState({
        accountId: accountId,
        index: null,
        history: account.history,
        active: false,
    });

    useEffect(() => {
        navigation.setOptions({
            header: (props) => <CustomNavigationBar {...props} displayName={account.name} mode={navbarMode} />,
        });
    }, []);

    const getHistoryWithSections = () => {
        let sections = [];
        let lastDate = '';

        for (record of account.history) {
            const date = new Date(record.date).toLocaleDateString('en-GB');

            if (date === lastDate) {
                sections[sections.length - 1].data.push(record);
            } else {
                sections.push({
                    title: date,
                    data: [record],
                });

                lastDate = date;
            }
        }

        return sections;
    };

    return (
        <>
            <SectionList
                contentContainerStyle={{ paddingBottom: 80 + bottom }}
                sections={getHistoryWithSections()}
                renderItem={({ item, index }) => (
                    <HistoryRecordCard
                        accountId={accountId}
                        name={item.name}
                        value={item.value.toFixed(2)}
                        date={item.date}
                        index={index}
                        fullHistory={account.history}
                        setRemoveData={setRemoveData}
                        navigation={navigation}
                    />
                )}
                renderSectionHeader={({ section }) => <HistoryRecordSectionHeader title={section.title} />}
                keyExtractor={(item, index) => {
                    return `${accountId}-${item}-${index}`;
                }}
                onScroll={onScroll}
                stickySectionHeadersEnabled
            />
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
                    removeCashAccountHistory(removeData.accountId, removeData.index, removeData.history);
                }}
                paragraphs={['Record will be removed permamently.', 'You cannot recover it after this.']}
            />
        </>
    );
}
