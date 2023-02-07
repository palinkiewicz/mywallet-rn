import { useState } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Text, Button } from 'react-native-paper';
import TextInputWithHelper from '../components/ui/TextInputWithHelper';
import { addCashAccountHistory } from '../components/logic/accounts/AddCashAccountHistory';

export default function AddAccountHistoryScreen({ navigation, route }) {
    const { accountId } = route.params;
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [errors, setErrors] = useState('');

    const onSubmit = () => {
        let errors = addCashAccountHistory(accountId, parseFloat(value), name);

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
                    setName(text);
                }}
                value={name}
                // error={errors.email.active ? true : false}
                // helperText={errors.email.msg}
            />
            <TextInputWithHelper
                mode="outlined"
                label="Value"
                onChangeText={(text) => {
                    setValue(text);
                }}
                value={value}
                // error={errors.email.active ? true : false}
                // helperText={errors.email.msg}
            />
            <Button
                onPress={onSubmit}
                mode="contained"
            >
                Add record
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
