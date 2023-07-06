import { memo, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function AnimatedToolbar({ title, buttons, visible = true }) {
    const { bottom } = useSafeAreaInsets();
    const { colors } = useTheme();
    const hideProgress = useRef(new Animated.Value(visible ? 0 : 100)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(hideProgress, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(hideProgress, {
                toValue: 100,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <Animated.View
            style={{
                position: 'absolute',
                right: 0,
                left: 0,
                bottom: 0,
                paddingBottom: bottom,
                height: 72 + bottom,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.elevation.level2,
                elevation: 2,
                paddingLeft: 24,
                paddingRight: 8,
                transform: [{ translateY: hideProgress }],
            }}
        >
            <View style={{ flex: 1 }}>
                <Text variant="titleSmall">{title}</Text>
            </View>
            {buttons}
        </Animated.View>
    );
}

export default memo(AnimatedToolbar);
