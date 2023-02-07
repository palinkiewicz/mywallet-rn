import { useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Text, Button } from 'react-native-paper';
import TextInputWithHelper from '../components/ui/TextInputWithHelper';
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
        <View style={styles.view}>
            <TextInputWithHelper
                mode='outlined'
                label="Account's name"
                onChangeText={(text) => {
                    setAccountName(text);
                }}
                value={accountName}
                // error={errors.email.active ? true : false}
                // helperText={errors.email.msg}
            />
            <ChooseIcon selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
            <Text style={{marginHorizontal: 16}} variant="labelSmall">Not required:</Text>
            <TextInputWithHelper
                mode='outlined'
                label="Custom icon (only native android icons)"
                onChangeText={(text) => {
                    setSelectedIcon(text);
                }}
                value={selectedIcon}
                // error={errors.email.active ? true : false}
                // helperText={errors.email.msg}
            />
            <Button onPress={onSubmit} mode="contained">Edit account</Button>
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
