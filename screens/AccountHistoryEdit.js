import { useState } from 'react';
import { View, Keyboard, StyleSheet } from 'react-native';
import { TextInput, HelperText, Button, Text } from 'react-native-paper';
import { updateCashAccountHistory } from '../components/logic/accounts/UpdateCashAccountHistory';

export default function EditAccountHistoryScreen({ navigation, route }) {
    const { docId, indexInHistory, history, value, name } = route.params;

    const [recordName, setRecordName] = useState(name);
    const [recordValue, setRecordValue] = useState(value);
    const [errors, setErrors] = useState('');

    const onSubmit = () => {
        let errors = updateCashAccountHistory(
            docId,
            indexInHistory,
            history,
            parseFloat(recordValue),
            recordName
        );

        if (Object.keys(errors).length === 0) {
            Keyboard.dismiss();
            return navigation.goBack();
        }

        setErrors('');
        for (let i in errors) {
            setErrors((current) => (current += errors[i].msg + '\n'));
        }
    };

    return (
        <View style={{ marginVertical: 12 }}>
            <TextInput
                mode="outlined"
                style={styles.textInput}
                label="Title"
                onChangeText={(text) => {
                    setRecordName(text);
                }}
                value={recordName}
                // error={errors.email.active ? true : false}
            />
            <HelperText
                type="error"
                // visible={errors.email.active ? true : false}
            >
                {/* {errors.email.msg} */}
            </HelperText>
            <TextInput
                mode="outlined"
                style={styles.textInput}
                label="Value"
                onChangeText={(text) => {
                    setRecordValue(text);
                }}
                value={recordValue}
                // error={errors.email.active ? true : false}
            />
            <HelperText
                type="error"
                // visible={errors.email.active ? true : false}
            >
                {/* {errors.email.msg} */}
            </HelperText>
            <Button
                onPress={onSubmit}
                mode="contained"
                style={styles.textInput}
            >
                Edit record
            </Button>
            {/* This will be replaced: */}
            <Text>{errors}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        marginHorizontal: 16,
        marginVertical: 4,
    },
});
