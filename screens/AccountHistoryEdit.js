import { useState } from 'react';
import { View, Keyboard, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import TextInputWithHelper from '../components/ui/TextInputWithHelper';
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
        <View style={styles.view}>
            <TextInputWithHelper
                mode="outlined"
                label="Title"
                onChangeText={(text) => {
                    setRecordName(text);
                }}
                value={recordName}
                // error={errors.email.active ? true : false}
                // helperText={errors.email.msg}
            />
            <TextInputWithHelper
                mode="outlined"
                label="Value"
                onChangeText={(text) => {
                    setRecordValue(text);
                }}
                value={recordValue}
                // error={errors.email.active ? true : false}
                // helperText={errors.email.msg}
            />
            <Button
                onPress={onSubmit}
                mode="contained"
            >
                Edit record
            </Button>
            {/* This will be replaced: */}
            <Text>{errors}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        margin: 16,
    }
});
