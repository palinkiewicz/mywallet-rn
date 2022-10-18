import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, IconButton, Menu } from 'react-native-paper';

export default function HistoryRecordCard({
    index,
    value,
    name,
    date,
    setRemoveData,
}) {
    const [menuShown, setMenuShown] = useState(false);

    const dateObj = new Date(date);
    const dateString = `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;

    return (
        <Card style={styles.card} mode="elevated">
            <Card.Title
                title={value + ' zł'}
                subtitle={dateString + (name === '' ? '' : ' - ') + name}
                right={(props) => (
                    <View style={{ flexDirection: 'row' }}>
                        <Menu
                            visible={menuShown}
                            onDismiss={() => setMenuShown(false)}
                            anchor={
                                <IconButton
                                    {...props}
                                    icon="dots-vertical"
                                    onPress={() => setMenuShown(true)}
                                />
                            }
                        >
                            <Menu.Item
                                onPress={() => {}}
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
                    </View>
                )}
            />
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 8,
        marginTop: 8,
    },
});
