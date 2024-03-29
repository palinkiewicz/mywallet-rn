import { useState } from 'react';
import { View, Keyboard, StyleSheet } from 'react-native';
import TextInputWithError from '../components/ui/TextInputWithError';
import DatePickerInputWithError from '../components/ui/DatePickerInputWithError';
import ButtonDisabledOnError from '../components/ui/ButtonDisabledOnError';
import { updateCashAccountHistory } from '../components/logic/firestore/accounts/UpdateCashAccountHistory';
import {
    validateAccountHistoryDate,
    validateAccountHistoryName,
    validateAccountHistoryValue,
} from '../components/logic/validation/AccountHistoryDataValidation';

export default function EditAccountHistoryScreen({ navigation, route }) {
    const { _docId, _indexInHistory, _history, _value, _name, _date } = route.params;

    const [name, setName] = useState(_name);
    const [value, setValue] = useState(_value);
    const [date, setDate] = useState(_date);
    const [errors, setErrors] = useState({});

    const onNameChange = (text) => {
        setName(text);
        setErrors({ ...errors, name: validateAccountHistoryName(text) });
    };

    const onValueChange = (text) => {
        text = text.replace(',', '.');
        setValue(text);
        setErrors({ ...errors, value: validateAccountHistoryValue(text) });
    };

    const onDateChange = (d) => {
        setDate(d);
        setErrors({ ...errors, date: validateAccountHistoryDate(d) });
    };

    const onSubmit = () => {
        const newErrors = {
            ...errors,
            name: validateAccountHistoryName(name),
            value: validateAccountHistoryValue(value),
            date: validateAccountHistoryDate(date),
        };

        setErrors(newErrors);

        if (Object.values(newErrors)?.filter((err) => err !== '').length === 0) {
            updateCashAccountHistory(_docId, _indexInHistory, _history, Number(value), name, date);

            Keyboard.dismiss();
            return navigation.goBack();
        }
    };

    return (
        <View style={styles.view}>
            <TextInputWithError
                mode="outlined"
                label="Title"
                onChangeText={onNameChange}
                value={name}
                error={errors.name}
                autoFocus
            />
            <TextInputWithError
                mode="outlined"
                label="Value"
                onChangeText={onValueChange}
                value={value}
                error={errors.value}
                keyboardType="numeric"
            />
            <DatePickerInputWithError
                mode="outlined"
                locale="en-GB"
                label="Date"
                value={date}
                onChange={onDateChange}
                inputMode="start"
                startYear={1970}
                endYear={new Date().getFullYear()}
                error={errors.date}
            />
            <ButtonDisabledOnError onPress={onSubmit} mode="contained" style={styles.editButton} errors={errors}>
                Edit record
            </ButtonDisabledOnError>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        margin: 16,
    },
    editButton: {
        marginTop: 8,
    },
});
