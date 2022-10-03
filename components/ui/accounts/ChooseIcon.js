import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SELECTABLE_ICONS } from '../../../constants';

export default function ChooseIcon({ selectedIcon, setSelectedIcon }) {
    return (
        <View style={styles.container}>
            {SELECTABLE_ICONS.map((icon) => (
                <IconButton
                    icon={icon}
                    key={icon}
                    onPress={() => {
                        setSelectedIcon(icon);
                    }}
                    mode={selectedIcon === icon ? 'contained' : ''}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
});
