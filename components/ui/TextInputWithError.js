import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

export default function TextInputWithError({
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
    keyboardType,
    autoFocus,
    inputRef,
}) {
    const [lastError, setLastError] = useState('');

    useEffect(() => {
        if (error !== '') setLastError(error);
    }, [error]);

    return (
        <View style={style}>
            <TextInput
                style={inputStyle}
                mode={mode}
                label={label}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={secureTextEntry}
                right={right}
                left={left}
                error={error}
                keyboardType={keyboardType}
                autoFocus={autoFocus}
                ref={inputRef}
            />
            <HelperText type="error" visible={error} style={{ paddingLeft: 16, ...helperStyle }}>
                {lastError}
            </HelperText>
        </View>
    );
}
