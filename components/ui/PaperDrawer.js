import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Drawer } from 'react-native-paper';
import { DRAWER_ITEMS } from '../../constants';
import { useNavigationState } from '@react-navigation/native';

export default function CustomDrawer({ navigation }) {
    const activeRoute = useNavigationState((state) => {
        if (state === undefined) return '';

        let stackRoutes = state.routes[0].state.routes;
        return stackRoutes[stackRoutes.length - 1].name;
    });

    return (
        <ScrollView>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                {Object.keys(DRAWER_ITEMS).map((key) => (
                    <Drawer.Item
                        key={DRAWER_ITEMS[key].name}
                        icon={DRAWER_ITEMS[key].icon}
                        label={DRAWER_ITEMS[key].name}
                        active={activeRoute === DRAWER_ITEMS[key].name}
                        onPress={() =>
                            navigation.navigate(DRAWER_ITEMS[key].name)
                        }
                    />
                ))}
            </SafeAreaView>
        </ScrollView>
    );
}
