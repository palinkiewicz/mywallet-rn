import { useContext, useState, useEffect } from 'react';
import { SectionList } from 'react-native';
import { AnimatedFAB, IconButton } from 'react-native-paper';
import { DataContext } from '../components/logic/DataContext';
import { removeCashAccountHistory } from '../components/logic/firestore/accounts/RemoveCashAccountHistory';
import DeleteDialog from '../components/ui/DeleteDialog';
import HistoryRecordCard from '../components/ui/accounts/HistoryRecordCard';
import { SCREENS_NAMES } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomNavigationBar from '../components/ui/PaperNavigationBar';
import HistoryRecordSectionHeader from '../components/ui/accounts/HistoryRecordSectionHeader';

export default function AccountHistoryScreen({ navigation, route }) {
    const { bottom } = useSafeAreaInsets();
    const { accountId, navbarMode } = route.params;
    const account = useContext(DataContext).accounts.find((item) => item.id === accountId).data;

    const [scrollPos, setScrollPos] = useState(0);
    const [selectedRecords, setSelectedRecords] = useState([]);

    const onScroll = ({ nativeEvent }) => {
        setScrollPos(Math.floor(nativeEvent?.contentOffset?.y) ?? 0);
    };

    const onRecordSelect = (recordIndex) => {
        setSelectedRecords([...new Set([...selectedRecords, recordIndex])]);
    };

    const onRecordDeselect = (recordIndex) => {
        setSelectedRecords(selectedRecords.filter((index) => index !== recordIndex));
    };

    const [removeData, setRemoveData] = useState({
        accountId: accountId,
        index: null,
        history: account.history,
        active: false,
    });

    useEffect(() => {
        navigation.setOptions({
            header: (props) => (
                <CustomNavigationBar
                    {...props}
                    displayName={account.name}
                    mode={navbarMode}
                    buttons={selectedRecords.length > 0 && <IconButton icon="delete" />}
                />
            ),
        });
    }, [selectedRecords]);

    const getHistoryWithSections = () => {
        let sections = [];
        let lastDate = null;

        const setLastPreviousSectionRecordPosition = (previousSectionIndex) => {
            if (lastDate) {
                const previousRecordIndex = sections[previousSectionIndex].data.length - 1;

                if (previousRecordIndex === 0) {
                    sections[previousSectionIndex].data[previousRecordIndex].sectionPosition = 'startend';
                } else {
                    sections[previousSectionIndex].data[previousRecordIndex].sectionPosition = 'end';
                }
            }
        };

        for (const [index, record] of account.history.entries()) {
            const date = new Date(record.date).toLocaleDateString('en-GB');

            if (date === lastDate) {
                sections[sections.length - 1].data.push({ ...record, index: index, sectionPosition: 'center' });
            } else {
                sections.push({
                    title: date,
                    data: [{ ...record, index: index, sectionPosition: 'start' }],
                });

                const previousSectionIndex = sections.length - 2;
                setLastPreviousSectionRecordPosition(previousSectionIndex);

                lastDate = date;
            }
        }

        const previousSectionIndex = sections.length - 1;
        setLastPreviousSectionRecordPosition(previousSectionIndex);

        return sections;
    };

    return (
        <>
            <SectionList
                contentContainerStyle={{ paddingBottom: 80 + bottom }}
                initialNumToRender={15}
                sections={getHistoryWithSections()}
                renderItem={({ item }) => (
                    <HistoryRecordCard
                        accountId={accountId}
                        name={item.name}
                        value={item.value.toFixed(2)}
                        date={item.date}
                        index={item.index}
                        fullHistory={account.history}
                        setRemoveData={setRemoveData}
                        navigation={navigation}
                        sectionPosition={item.sectionPosition}
                        selectionMode={selectedRecords.length > 0}
                        selected={selectedRecords.includes(item.index)}
                        onSelect={onRecordSelect}
                        onDeselect={onRecordDeselect}
                    />
                )}
                renderSectionHeader={({ section }) => <HistoryRecordSectionHeader title={section.title} />}
                keyExtractor={(item) => {
                    return `${accountId}-${item.index}-${item.name}`;
                }}
                onScroll={onScroll}
            />
            <AnimatedFAB
                icon="plus"
                label="New record"
                extended={scrollPos <= 0}
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
