import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

function TextInputWithHelper({
    style,
    mode,
    label,
    onChangeText,
    value,
    error,
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

export default TextInputWithHelper;
