import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { HelperText } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';

export default function DatePickerInputWithError({
    style,
    mode,
    locale,
    label,
    onChangeText,
    onChange,
    value,
    error,
    startYear,
    endYear,
    inputMode,
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
            <DatePickerInput
                style={inputStyle}
                mode={mode}
                locale={locale}
                label={label}
                value={value}
                onChange={onChange}
                onChangeText={onChangeText}
                inputMode={inputMode}
                startYear={startYear}
                endYear={endYear}
                hasError={error}
                keyboardType={keyboardType}
                autoFocus={autoFocus}
                ref={inputRef}
            />
            <HelperText
                type="error"
                visible={error}
                style={{paddingLeft: 16, ...helperStyle}}
            >
                {lastError}
            </HelperText>
        </View>
    );
}
