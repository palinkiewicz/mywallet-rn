import { useState } from 'react';
import { View, Keyboard, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import TextInputWithHelper from '../components/ui/TextInputWithHelper';
import { updateCashAccountHistory } from '../components/logic/accounts/UpdateCashAccountHistory';
import getInitialErrorState from '../components/logic/GetInitialErrorState';

export default function EditAccountHistoryScreen({ navigation, route }) {
    const { docId, indexInHistory, history, value, name } = route.params;

    const [recordName, setRecordName] = useState(name);
    const [recordValue, setRecordValue] = useState(value);
    const [errors, setErrors] = useState(
        getInitialErrorState(['document', 'record', 'history', 'name', 'value'])
    );

    const onSubmit = () => {
        let newErrors = updateCashAccountHistory(
            docId,
            indexInHistory,
            history,
            parseFloat(recordValue),
            recordName
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
