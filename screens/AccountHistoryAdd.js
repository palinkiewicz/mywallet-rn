import { useState } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';
import TextInputWithHelper from '../components/ui/TextInputWithHelper';
import { addCashAccountHistory } from '../components/logic/accounts/AddCashAccountHistory';
import getInitialErrorState from '../components/logic/GetInitialErrorState';

export default function AddAccountHistoryScreen({ navigation, route }) {
    const { accountId } = route.params;
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [errors, setErrors] = useState(
        getInitialErrorState(['document', 'name', 'value'])
    );

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
});
