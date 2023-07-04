import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Avatar, IconButton, Button, Menu } from 'react-native-paper';

export default function AccountCard({
    id,
    icon,
    title,
    amount,
    setRemoveData,
    navigation,
}) {
    const [menuShown, setMenuShown] = useState(false);

    return (
        <Card style={styles.card}>
            <Card.Title
                title={title}
                subtitle={amount + ' zł'}
                left={(props) => <Avatar.Icon {...props} icon={icon} />}
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
                                onPress={() => {
                                    setMenuShown(false);
                                    navigation.navigate('Edit account', {
                                        _docId: id,
                                        _name: title,
                                        _icon: icon,
                                    });
                                }}
                                leadingIcon="pencil-outline"
                                title="Edit"
                            />
                            <Menu.Item
                                onPress={() => {
                                    setMenuShown(false);
                                    setRemoveData({
                                        active: true,
                                        accountId: id,
                                    });
                                }}
                                leadingIcon="delete-outline"
                                title="Delete"
                            />
                        </Menu>
                    </View>
                )}
            />
            <Card.Actions>
                <Button
                    onPress={() => {
                        navigation.navigate('Account history', {
                            accountId: id,
                        });
                    }}
                >
                    See history
                </Button>
                <Button
                    onPress={() => {
                        navigation.navigate('Add account history', {
                            accountId: id,
                        });
                    }}
                >
                    Add record
                </Button>
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 8,
        marginTop: 8,
    },
});
