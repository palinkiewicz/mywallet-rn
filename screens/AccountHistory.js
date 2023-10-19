import { useContext, useState, useEffect, useMemo } from 'react';
import { SectionList, ToastAndroid } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { DataContext } from '../components/logic/DataContext';
import { removeCashAccountHistory } from '../components/logic/firestore/accounts/RemoveCashAccountHistory';
import DeleteDialog from '../components/ui/DeleteDialog';
import HistoryRecordCard from '../components/ui/accounts/HistoryRecordCard';
import { SCREENS_NAMES } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomNavigationBar from '../components/ui/PaperNavigationBar';
import HistoryRecordSectionHeader from '../components/ui/accounts/HistoryRecordSectionHeader';
import AnimatedHideableFAB from '../components/ui/AnimatedHideableFAB';
import AnimatedToolbar from '../components/ui/AnimatedToolbar';

export default function AccountHistoryScreen({ navigation, route }) {
    const { bottom } = useSafeAreaInsets();
    const { colors } = useTheme();
    const { accountId, navbarMode } = route.params;
    const account = useContext(DataContext).accounts.find((item) => item.id === accountId).data;

    const [scrollPos, setScrollPos] = useState(0);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [selectionMode, setSelectionMode] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

    const onScroll = ({ nativeEvent }) => {
        setScrollPos(Math.floor(nativeEvent?.contentOffset?.y) ?? 0);
    };

    const onRecordSelect = (recordIndex) => {
        setSelectedRecords([...new Set([...selectedRecords, recordIndex])]);
        setSelectionMode(true);
    };

    const onRecordDeselect = (recordIndex) => {
        setSelectedRecords(selectedRecords.filter((index) => index !== recordIndex));
    };

    const onDeleteDialogDismiss = () => {
        setDeleteDialogVisible(false);
    };

    const onDeleteDialogConfirm = () => {
        setDeleteDialogVisible(false);
        removeCashAccountHistory(accountId, selectedRecords, account.history);
    };

    const onDelete = () => {
        if (selectedRecords.length > 0) {
            setDeleteDialogVisible(true);
        } else {
            ToastAndroid.show('Select any record first.', ToastAndroid.SHORT);
        }
    };

    const onCheckAll = () => {
        if (selectedRecords.length === account.history.length) {
            setSelectedRecords([]);
        } else {
            setSelectedRecords([...Array(account.history.length).keys()]);
        }
    };

    const onCloseToolbar = () => {
        setSelectedRecords([]);
        setSelectionMode(false);
    };

    useEffect(() => {
        navigation.setOptions({
            header: (props) => (
                <CustomNavigationBar
                    {...props}
                    displayName={
                        selectionMode
                            ? selectedRecords.length > 0 ? `Selected: ${selectedRecords.length} record${selectedRecords.length === 1 ? '' : 's'}` : 'No records selected'
                            : account.name
                    }
                    mode={navbarMode}
                    customLeading={
                        selectionMode && (
                            <IconButton icon="close" iconColor={colors.onSurface} onPress={onCloseToolbar} />
                        )
                    }
                />
            ),
        });
    }, [selectionMode, selectedRecords]);

    const historyWithSections = useMemo(() => {
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
    }, [account.history]);

    return (
        <>
            <SectionList
                contentContainerStyle={{ paddingBottom: 80 + bottom }}
                initialNumToRender={15}
                sections={historyWithSections}
                renderItem={({ item }) => (
                    <HistoryRecordCard
                        accountId={accountId}
                        name={item.name}
                        value={item.value.toFixed(2)}
                        date={item.date}
                        index={item.index}
                        fullHistory={account.history}
                        navigation={navigation}
                        sectionPosition={item.sectionPosition}
                        selectionMode={selectionMode}
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
            <AnimatedHideableFAB
                icon="plus"
                label="New record"
                extended={scrollPos <= 0}
                onPress={() => {
                    navigation.navigate(SCREENS_NAMES.addAccountHistory, {
                        accountId: accountId,
                    });
                }}
                visible={!selectionMode}
            />
            <DeleteDialog
                visible={deleteDialogVisible}
                onDismiss={onDeleteDialogDismiss}
                onConfirm={onDeleteDialogConfirm}
                title={`Delete ${selectedRecords.length} record${selectedRecords.length > 1 ? 's' : ''} permamently?`}
                paragraphs={[`You will not be able to recover ${selectedRecords.length > 1 ? 'them' : 'it'}.`]}
            />
            <AnimatedToolbar
                visible={selectionMode}
                buttons={
                    <>
                        <IconButton
                            icon="check-all"
                            selected={selectedRecords.length === account.history.length}
                            onPress={onCheckAll}
                        />
                        {/* Will be implemented in the future */}
                        <IconButton icon="chart-box-outline" onPress={() => {}} />
                        <IconButton icon="delete-outline" onPress={onDelete} />
                    </>
                }
            />
        </>
    );
}
