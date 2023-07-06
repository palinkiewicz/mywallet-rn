import { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { TouchableRipple, useTheme, Text, Checkbox } from 'react-native-paper';

export default function HistoryRecordCard({
    accountId,
    value,
    name,
    date,
    index,
    fullHistory,
    navigation,
    sectionPosition,
    onSelect = () => {},
    onDeselect = () => {},
    selected = false,
    selectionMode = false,
}) {
    const dateObj = new Date(date);
    const { colors } = useTheme();
    const posStart = sectionPosition === 'startend' || sectionPosition === 'start';
    const posEnd = sectionPosition === 'startend' || sectionPosition === 'end';
    const checkboxScale = useRef(new Animated.Value(0)).current;

    const edit = () => {
        navigation.navigate('Edit history record', {
            _docId: accountId,
            _indexInHistory: index,
            _history: fullHistory,
            _value: value,
            _name: name,
            _date: dateObj,
        });
    };

    const select = () => {
        if (selected) {
            onDeselect(index);
        } else {
            onSelect(index);
        }
    };

    const onCardPress = () => {
        if (selectionMode) {
            select();
        } else {
            edit();
        }
    };

    const onCardLongPress = () => {
        onSelect(index);
    };

    const onCheckboxPress = () => {
        select();
    };

    useEffect(() => {
        if (selectionMode) {
            Animated.timing(checkboxScale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(checkboxScale, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }).start();
        }
    }, [selectionMode]);

    return (
        <TouchableRipple
            onPress={onCardPress}
            onLongPress={onCardLongPress}
            borderless
            style={{
                borderBottomLeftRadius: posEnd ? 12 : 0,
                borderBottomRightRadius: posEnd ? 12 : 0,
                borderTopLeftRadius: posStart ? 12 : 0,
                borderTopRightRadius: posStart ? 12 : 0,
                marginBottom: 4,
                marginLeft: 8,
                marginRight: 8,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 8,
                    paddingLeft: 16,
                    backgroundColor: selected ? colors.secondaryContainer : colors.elevation.level2,
                    elevation: 1,
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', paddingBottom: 12, paddingTop: 8 }}>
                    <Text
                        numberOfLines={1}
                        variant="titleMedium"
                        style={{ color: value > 0 ? colors.tertiary : colors.error }}
                    >
                        {(value > 0 ? '+' : '') + value + ' zł'}
                    </Text>
                    <Text numberOfLines={1}>{name}</Text>
                </View>
                <Animated.View style={{transform: [{scale: checkboxScale}]}}><Checkbox status={selected ? 'checked' : 'unchecked'} onPress={onCheckboxPress} /></Animated.View>
            </View>
        </TouchableRipple>
    );
}
