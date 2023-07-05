import { useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import TextInputWithError from '../components/ui/TextInputWithError';
import { updateCashAccount } from '../components/logic/firestore/accounts/UpdateCashAccount';
import ChooseIcon from '../components/ui/accounts/ChooseIcon';
import { validateAccountName, validateAccountIcon } from '../components/logic/validation/AccountDataValidation';
import ButtonDisabledOnError from '../components/ui/ButtonDisabledOnError';

export default function EditAccountScreen({ navigation, route }) {
    const { _docId, _name, _icon } = route.params;

    const [name, setName] = useState(_name);
    const [icon, setIcon] = useState(_icon);
    const [errors, setErrors] = useState({});

    const onNameChange = (text) => {
        setName(text);
        setErrors({ ...errors, name: validateAccountName(text) });
    };

    const onIconChange = (text) => {
        setIcon(text);
        setErrors({ ...errors, icon: validateAccountIcon(text) });
    };

    const onSubmit = () => {
        const newErrors = {
            ...errors,
            name: validateAccountName(name),
            icon: validateAccountIcon(icon),
        };

        setErrors(newErrors);

        if (Object.values(newErrors)?.filter((err) => err !== '').length === 0) {
            updateCashAccount(_docId, name, icon);

            Keyboard.dismiss();
            return navigation.goBack();
        }
    };

    return (
        <View style={styles.view}>
            <TextInputWithError
                mode="outlined"
                label="Account's name"
                onChangeText={onNameChange}
                value={name}
                error={errors.name}
                autoFocus
            />
            <ChooseIcon selectedIcon={icon} setSelectedIcon={onIconChange} />
            <TextInputWithError
                mode="outlined"
                label="Custom icon (only native android icons)"
                onChangeText={onIconChange}
                value={icon}
                error={errors.icon}
            />
            <ButtonDisabledOnError onPress={onSubmit} mode="contained" style={styles.editButton} errors={errors}>
                Edit account
            </ButtonDisabledOnError>
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
