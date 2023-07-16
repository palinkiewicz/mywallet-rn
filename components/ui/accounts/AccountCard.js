import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, IconButton, Button, TouchableRipple, useTheme, Text } from 'react-native-paper';

export default function AccountCard({ id, icon, title, amount, setRemoveData, navigation }) {
    const [menuShown, setMenuShown] = useState(false);
    const { colors } = useTheme();

    const onShowHistory = () => {
        navigation.navigate('Account history', {
            accountId: id,
        });
    };

    const onEdit = () => {
        setMenuShown(false);
        navigation.navigate('Edit account', {
            _docId: id,
            _name: title,
            _icon: icon,
        });
    };

    const onDelete = () => {
        setMenuShown(false);
        setRemoveData({
            active: true,
            accountId: id,
        });
    };

    const onAddRecord = () => {
        navigation.navigate('Add account history', {
            accountId: id,
        });
    };

    return (
        <TouchableRipple
            borderless
            style={{
                borderRadius: 12,
                marginHorizontal: 8,
                marginTop: 8,
                borderColor: colors.outline,
                borderWidth: 1,
                backgroundColor: colors.surface,
            }}
            onPress={onShowHistory}
        >
            <View>
                <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar.Icon icon={icon} size={40} />
                    <View style={{ marginLeft: 16 }}>
                        <Text variant="bodyLarge" numberOfLines={1} style={{ marginBottom: 4 }}>
                            {title}
                        </Text>
                        <Text numberOfLines={1} style={{ marginBottom: 2 }}>
                            {amount + ' zł'}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingRight: 16,
                        paddingLeft: 8,
                        paddingBottom: 12,
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <IconButton icon="history" onPress={onShowHistory} />
                        <IconButton icon="delete-outline" onPress={onDelete} />
                        <IconButton icon="pencil-outline" onPress={onEdit} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Button mode="contained-tonal" onPress={onAddRecord}>
                            Add record
                        </Button>
                    </View>
                </View>
            </View>
        </TouchableRipple>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 8,
        marginTop: 8,
    },
});
