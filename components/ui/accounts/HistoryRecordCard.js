import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, IconButton, Menu, Text, useTheme } from 'react-native-paper';

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

    return (
        <Card style={styles.card} mode="outlined">
            <Card.Title
                title={(value > 0 ? '+' : '') + value + ' zł'}
                titleVariant='titleMedium'
                titleStyle={{color: value > 0 ? colors.tertiary : colors.error}}
                subtitle={name}
                right={(props) => (
                    <Menu
                        visible={menuShown}
                        onDismiss={() => setMenuShown(false)}
                        anchor={<IconButton {...props} icon="dots-vertical" onPress={() => setMenuShown(true)} />}
                    >
                        <Menu.Item
                            onPress={() => {
                                setMenuShown(false);
                                navigation.navigate('Edit history record', {
                                    _docId: accountId,
                                    _indexInHistory: index,
                                    _history: fullHistory,
                                    _value: value,
                                    _name: name,
                                    _date: dateObj,
                                });
                            }}
                            leadingIcon="pencil-outline"
                            title="Edit"
                        />
                        <Menu.Item
                            onPress={() => {
                                setMenuShown(false);
                                setRemoveData((current) => ({
                                    ...current,
                                    active: true,
                                    index: index,
                                }));
                            }}
                            leadingIcon="delete-outline"
                            title="Delete"
                        />
                    </Menu>
                )}
            />
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 8,
        marginVertical: 4,
    },
});
