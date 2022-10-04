import { useState } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { TextInput, HelperText, Text, Button } from 'react-native-paper';
import addCashAccountHistory from '../components/logic/accounts/AddCashAccountHistory';

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
        <View style={{ marginVertical: 12 }}>
            <TextInput
                mode="outlined"
                style={styles.textInput}
                label="Title"
                onChangeText={(text) => {
                    setName(text);
                }}
                value={name}
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
                    setValue(text);
                }}
                value={value}
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
                Add record
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
