import { useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { TextInput, HelperText, Text, Button } from 'react-native-paper';
import { updateCashAccount } from '../components/logic/accounts/UpdateCashAccount';
import ChooseIcon from '../components/ui/accounts/ChooseIcon';

export default function EditAccountScreen({ navigation, route }) {
    const { docId, name, icon } = route.params;

    const [accountName, setAccountName] = useState(name);
    const [selectedIcon, setSelectedIcon] = useState(icon);
    const [errors, setErrors] = useState('');

    const onSubmit = () => {
        let errors = updateCashAccount(docId, accountName, selectedIcon);

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
        <View style={{marginVertical: 12}}>
            <TextInput
                mode='outlined'
                style={styles.textInput}
                label="Account's name"
                onChangeText={(text) => {
                    setAccountName(text);
                }}
                value={accountName}
                // error={errors.email.active ? true : false}
            />
            <HelperText
                type="error"
                // visible={errors.email.active ? true : false}
            >
                {/* {errors.email.msg} */}
            </HelperText>
            <ChooseIcon selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
            <Text style={{marginHorizontal: 16}} variant="labelSmall">Not required:</Text>
            <TextInput
                mode='outlined'
                style={styles.textInput}
                label="Custom icon (only native android icons)"
                onChangeText={(text) => {
                    setSelectedIcon(text);
                }}
                value={selectedIcon}
                // error={errors.email.active ? true : false}
            />
            <HelperText
                type="error"
                // visible={errors.email.active ? true : false}
            >
                {/* {errors.email.msg} */}
            </HelperText>
            <Button onPress={onSubmit} mode="contained" style={styles.textInput}>Edit account</Button>
            {/* This will be replaced: */}
            <Text>{errors}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        marginHorizontal: 16,
        marginVertical: 4,
    }
});
