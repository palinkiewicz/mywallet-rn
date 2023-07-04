import { useState } from 'react';
import { View, Keyboard, StyleSheet } from 'react-native';
import { Button, HelperText } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import TextInputWithHelper from '../components/ui/TextInputWithHelper';
import { updateCashAccountHistory } from '../components/logic/accounts/UpdateCashAccountHistory';
import getInitialErrorState from '../components/logic/GetInitialErrorState';

export default function EditAccountHistoryScreen({ navigation, route }) {
    const { docId, indexInHistory, history, value, name, _date } = route.params;

    const [recordName, setRecordName] = useState(name);
    const [recordValue, setRecordValue] = useState(value);
    const [date, setDate] = useState(_date);

    const [errors, setErrors] = useState(
        getInitialErrorState(['document', 'record', 'history', 'name', 'value', 'date'])
    );

    const onDateChange = (d) => {
        const minimumDate = new Date(1970, 0, 1);
        const currentDate = new Date();

        setDate(d);

        if (d < minimumDate || d > currentDate) {
            errors.date = {
                active: true,
                msg: 'Should be between ' + minimumDate.toLocaleDateString('en-GB') + ' and ' + currentDate.toLocaleDateString('en-GB'),
            }
        } else {
            errors.date.active = false;
        }
    }

    const onSubmit = () => {
        let newErrors = updateCashAccountHistory(
            docId,
            indexInHistory,
            history,
            parseFloat(recordValue),
            recordName,
            date
        );

        if (Object.keys(newErrors).length === 0) {
            Keyboard.dismiss();
            return navigation.goBack();
        }

        setErrors((prev) => {
            return { ...prev, ...newErrors };
        });
    };

    return (
        <View style={styles.view}>
            <TextInputWithHelper
                mode="outlined"
                label="Title"
                onChangeText={(text) => {
                    setRecordName(text);
                }}
                value={recordName}
                error={errors.name.active}
                helperText={errors.name.msg}
            />
            <TextInputWithHelper
                mode="outlined"
                label="Value"
                onChangeText={(text) => {
                    setRecordValue(text);
                }}
                value={recordValue}
                error={errors.value.active}
                helperText={errors.value.msg}
            />
            <DatePickerInput
                mode="outlined"
                locale="en-GB"
                label="Date"
                value={date}
                onChange={onDateChange}
                inputMode="start"
                startYear={1970}
                endYear={(new Date()).getFullYear()}
                hasError={errors.date.active}
            />
            <HelperText
                type="error"
                visible={errors.date.active}
                style={styles.helper}
            >
                {errors.date.msg}
            </HelperText>
            <Button
                onPress={onSubmit}
                mode="contained"
                style={styles.editButton}
            >
                Edit record
            </Button>
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
