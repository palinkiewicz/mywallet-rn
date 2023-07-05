import { Text, useTheme } from 'react-native-paper';

export default function HistoryRecordSectionHeader({ title }) {
    const { colors } = useTheme();

    return (
        <Text
            style={{
                backgroundColor: colors.surface,
                paddingTop: 8,
                paddingBottom: 4,
                paddingLeft: 24,
            }}
        >
            {title}
        </Text>
    );
}
