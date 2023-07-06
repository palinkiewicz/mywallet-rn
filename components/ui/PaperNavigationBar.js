import { Appbar } from 'react-native-paper';

export default function CustomNavigationBar({
    navigation,
    back,
    displayName,
    onDrawer = false,
    mode = 'small',
    buttons,
    customLeading,
}) {
    return (
        <Appbar.Header elevated mode={mode}>
            {customLeading ? (
                customLeading
            ) : onDrawer ? (
                <Appbar.Action onPress={navigation.openDrawer} icon="menu" isLeading />
            ) : back ? (
                <Appbar.BackAction onPress={navigation.goBack} />
            ) : null}
            <Appbar.Content title={displayName} />
            {buttons}
        </Appbar.Header>
    );
}
