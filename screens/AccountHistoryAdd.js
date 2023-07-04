import { useState } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Button, HelperText } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import TextInputWithHelper from '../components/ui/TextInputWithHelper';
import { addCashAccountHistory } from '../components/logic/accounts/AddCashAccountHistory';
import getInitialErrorState from '../components/logic/GetInitialErrorState';

export default function AddAccountHistoryScreen({ navigation, route }) {
    const { accountId } = route.params;

    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState(new Date());

    const [errors, setErrors] = useState(
        getInitialErrorState(['document', 'name', 'value', 'date'])
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
        let newErrors = addCashAccountHistory(
            accountId,
            parseFloat(value),
            name
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
                    setName(text);
                }}
                value={name}
                error={errors.name.active}
                helperText={errors.name.msg}
            />
            <TextInputWithHelper
                mode="outlined"
                label="Value"
                onChangeText={(text) => {
                    setValue(text);
                }}
                value={value}
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
                style={styles.addButton}
                onPress={onSubmit}
                mode="contained"
            >
                Add record
            </Button>
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
    }
});
