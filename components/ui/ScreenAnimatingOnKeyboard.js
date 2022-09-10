import { useEffect } from 'react';
import { View, StatusBar, Dimensions, Keyboard } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

/**
 * A screen wrapper that fills the entire screen, shrinks smoothly if a keyboard is shown, and expands if hidden.
 * IMPORTANT: If a device has a notch, the status bar height must be added to windowHeight.
 * By default, I assume that if the status bar height is greater than 24, the device is one with a notch.
 */
export default function ScreenAnimatingOnKeyboard({
    children,
    maxNotchlessStatusBarHeight = 24,
}) {
    // Getting app's window height.
    var windowHeight = Dimensions.get('window').height;
    if (StatusBar.currentHeight > maxNotchlessStatusBarHeight)
        windowHeight += StatusBar.currentHeight;

    // Creating an animated style for the wrapper.
    const viewHeight = useSharedValue(windowHeight);
    const viewAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: viewHeight.value,
        };
    }, []);

    // Animating the wrapper when the keyboard is being shown.
    useEffect(() => {
        const showSubscription = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                viewHeight.value = withTiming(
                    windowHeight - e.endCoordinates.height,
                    { duration: 140 }
                );
            }
        );

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            viewHeight.value = withTiming(windowHeight, { duration: 140 });
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    // Returning the wrapper.
    return <Animated.View style={viewAnimatedStyle}>{children}</Animated.View>;
}
