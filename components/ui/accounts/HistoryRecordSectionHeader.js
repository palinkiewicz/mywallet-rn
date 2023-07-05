import { Text, useTheme } from 'react-native-paper';

export default function HistoryRecordSectionHeader({ title }) {
    const { colors } = useTheme();

    return (
        <Text
            style={{
                backgroundColor: colors.surface,
                paddingTop: 16,
                paddingBottom: 8,
                paddingLeft: 24,
            }}
            variant='labelLarge'
        >
            {title}
        </Text>
    );
}
