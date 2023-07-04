import { Appbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { MAIN_SCREENS } from '../../screens/_ScreensData';

export default function CustomNavigationBar({ navigation, back }) {
    const routeName = useRoute().name;
    const screen = MAIN_SCREENS.find((screen) => screen.name === routeName);
    const onDrawer = !screen ? false : !screen.onDrawer ? false : true;

    return (
        <Appbar.Header elevated>
            {onDrawer && <Appbar.Action onPress={navigation.openDrawer} icon="menu" />}
            {back && !onDrawer ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={' ' + routeName} />
        </Appbar.Header>
    );
}
