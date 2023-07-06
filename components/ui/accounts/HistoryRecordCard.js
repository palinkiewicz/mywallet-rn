import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, TouchableRipple, useTheme, Text } from 'react-native-paper';

export default function HistoryRecordCard({
    accountId,
    value,
    name,
    date,
    index,
    fullHistory,
    setRemoveData,
    navigation,
    sectionPosition,
}) {
    const [menuShown, setMenuShown] = useState(false);

    const dateObj = new Date(date);
    const { colors } = useTheme();
    const posStart = sectionPosition === 'startend' || sectionPosition === 'start';
    const posEnd = sectionPosition === 'startend' || sectionPosition === 'end';

    const onEdit = () => {
        setMenuShown(false);
        navigation.navigate('Edit history record', {
            _docId: accountId,
            _indexInHistory: index,
            _history: fullHistory,
            _value: value,
            _name: name,
            _date: dateObj,
        });
    };

    const onDelete = () => {
        setMenuShown(false);
        setRemoveData((current) => ({
            ...current,
            active: true,
            index: index,
        }));
    };

    return (
        <TouchableRipple
            onPress={onEdit}
            borderless
            style={{
                borderBottomLeftRadius: posEnd ? 12 : 0,
                borderBottomRightRadius: posEnd ? 12 : 0,
                borderTopLeftRadius: posStart ? 12 : 0,
                borderTopRightRadius: posStart ? 12 : 0,
                marginBottom: 4,
                marginLeft: 8,
                marginRight: 8,
                backgroundColor: colors.elevation.level2,
                elevation: 1,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 8,
                    paddingLeft: 16,
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', paddingBottom: 12, paddingTop: 8 }}>
                    <Text
                        numberOfLines={1}
                        variant="titleMedium"
                        style={{ color: value > 0 ? colors.tertiary : colors.error }}
                    >
                        {(value > 0 ? '+' : '') + value + ' zł'}
                    </Text>
                    <Text numberOfLines={1}>{name}</Text>
                </View>
                <IconButton icon="delete" onPress={onDelete} />
            </View>
        </TouchableRipple>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 8,
        marginVertical: 4,
    },
});
