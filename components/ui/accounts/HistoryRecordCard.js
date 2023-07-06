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
}) {
    const [menuShown, setMenuShown] = useState(false);

    const dateObj = new Date(date);
    const { colors } = useTheme();

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
        <TouchableRipple onPress={onEdit} style={{ borderRadius: 16 }}>
            <View
                style={{
                    flexDirection: 'row',
                    borderRadius: 16,
                    alignItems: 'center',
                    paddingRight: 8,
                    paddingLeft: 16,
                    paddingBottom: 4,
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center' }}>
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
