import { Text, useTheme } from 'react-native-paper';

export default function HistoryRecordSectionHeader({ title }) {
    const { colors } = useTheme();

    return (
        <Text style={{ backgroundColor: colors.background, paddingTop: 8, paddingBottom: 4, paddingLeft: 8 }}>
            {title}
        </Text>
    );
}
