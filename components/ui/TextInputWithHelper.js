import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

export default function TextInputWithHelper({
    style,
    mode,
    label,
    onChangeText,
    value,
    secureTextEntry,
    error,
    right,
    left,
    inputStyle,
    helperStyle,
    helperText,
    helperVisible,
}) {
    return (
        <View style={style}>
            <TextInput
                mode={mode}
                label={label}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={secureTextEntry}
                right={right}
                left={left}
                error={error}
                style={inputStyle}
            />
            <HelperText
                type={error ? "error" : "info"}
                visible={helperVisible}
                style={{paddingLeft: 16, ...helperStyle}}
            >
                {helperText}
            </HelperText>
        </View>
    );
}
