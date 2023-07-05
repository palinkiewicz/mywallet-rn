import { Appbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

export default function CustomNavigationBar({ navigation, back, displayName, onDrawer = false, mode = 'small', buttons }) {
    const name = displayName ?? useRoute().name;

    return (
        <Appbar.Header elevated mode={mode}>
            {onDrawer && <Appbar.Action onPress={navigation.openDrawer} icon="menu" isLeading/>}
            {back && !onDrawer ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={' ' + name} />
            {buttons}
        </Appbar.Header>
    );
}
