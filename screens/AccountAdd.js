import { useState, useContext } from 'react';
import { StyleSheet, View, Keyboard} from 'react-native';
import { TextInput, HelperText, Text, Button } from 'react-native-paper';
import ChooseIcon from '../components/ui/accounts/ChooseIcon';
import { UserContext } from '../components/logic/auth/UserContext';
import addCashAccount from '../components/logic/accounts/AddCashAccount';
import { SELECTABLE_ICONS } from '../constants';

export default function AddAccountScreen({ navigation }) {
    const user = useContext(UserContext);
    const [accountName, setAccountName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(SELECTABLE_ICONS[0]);
    const [errors, setErrors] = useState('');

    const onSubmit = () => {
        let errors = addCashAccount(user, accountName, selectedIcon);

        if (Object.keys(errors).length === 0) {
            Keyboard.dismiss();
            return navigation.goBack();
        };

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
            <Button onPress={onSubmit} mode="contained" style={styles.textInput}>Add account</Button>
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
