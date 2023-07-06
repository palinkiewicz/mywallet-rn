import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AnimatedHideableFAB({
    icon = 'plus',
    label = '',
    extended = false,
    visible = true,
    onPress = () => {},
    style,
    fabStyle,
}) {
    const { bottom } = useSafeAreaInsets();
    const hideProgress = useRef(new Animated.Value(visible ? 0 : 200)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(hideProgress, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(hideProgress, {
                toValue: 200,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    return (
        <Animated.View
            style={{
                ...style,
                transform: [{ translateX: hideProgress }],
            }}
        >
            <AnimatedFAB
                icon={icon}
                label={label}
                extended={extended}
                onPress={visible ? onPress : () => {}}
                style={{ ...fabStyle, bottom: 16 + bottom, right: 16 }}
            />
        </Animated.View>
    );
}
