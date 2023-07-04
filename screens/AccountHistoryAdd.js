import { useState } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import TextInputWithError from '../components/ui/TextInputWithError';
import { addCashAccountHistory } from '../components/logic/accounts/AddCashAccountHistory';
import DatePickerInputWithError from '../components/ui/DatePickerInputWithError';
import {
    validateAccountHistoryDate,
    validateAccountHistoryName,
    validateAccountHistoryValue,
} from '../components/logic/validation/AccountHistoryDataValidation';
import ButtonDisabledOnError from '../components/ui/ButtonDisabledOnError';

export default function AddAccountHistoryScreen({ navigation, route }) {
    const { accountId } = route.params;

    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState(new Date());
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
            addCashAccountHistory(accountId, parseFloat(value), name, date);

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
            <ButtonDisabledOnError style={styles.addButton} onPress={onSubmit} mode="contained" errors={errors}>
                Add record
            </ButtonDisabledOnError>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        margin: 16,
    },
    addButton: {
        marginTop: 8,
    },
    helper: {
        paddingLeft: 16,
    },
});
