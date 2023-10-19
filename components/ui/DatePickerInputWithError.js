import { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { DatePickerInput, DatePickerModal } from 'react-native-paper-dates';

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
    modalMode = 'single',
    inputMode,
    inputStyle,
    helperStyle,
    keyboardType,
    autoFocus,
    inputRef,
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [lastError, setLastError] = useState('');

    useEffect(() => {
        if (error !== '') setLastError(error);
    }, [error]);

    const onOpenModal = () => {
        setModalOpen(true);
    };

    const onDismissModal = () => {
        setModalOpen(false);
    };

    const onConfirmModal = (params) => {
        setModalOpen(false);
        onChange(params.date);
    }

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
                // Default modal button is not centered
                right={
                    <TextInput.Icon icon="calendar" onPress={onOpenModal} />
                }
                withModal={false}
            />
            <HelperText type="error" visible={error} style={{ paddingLeft: 16, ...helperStyle }}>
                {lastError}
            </HelperText>
            <DatePickerModal
                locale={locale}
                mode={modalMode}
                visible={modalOpen}
                date={value}
                startYear={startYear}
                endYear={endYear}
                onDismiss={onDismissModal}
                onConfirm={onConfirmModal}
            />
        </View>
    );
}
