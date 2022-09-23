import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Drawer, Text } from 'react-native-paper';
import { useNavigationState } from '@react-navigation/native';
import { MAIN_SCREENS } from '../../screens/_ScreensData';

export default function CustomDrawer({ navigation }) {
    const activeRoute = useNavigationState((state) => {
        if (state === undefined) return '';

        let stackRoutes = state.routes[0].state.routes;
        return stackRoutes[stackRoutes.length - 1].name;
    });

    return (
        <ScrollView>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.titleContainer}>
                    <Text variant="titleLarge">myWallet</Text>
                </View>
                {MAIN_SCREENS.map(
                    (screen) =>
                        screen.onDrawer !== undefined && (
                            <Drawer.Item
                                key={screen.name}
                                icon={screen.onDrawer.icon}
                                label={screen.name}
                                active={activeRoute === screen.name}
                                onPress={() => navigation.navigate(screen.name)}
                            />
                        )
                )}
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        paddingHorizontal: 28,
        marginBottom: 8,
        height: 64,
        justifyContent: 'center',
    },
});
