import { useState, useContext } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import TextInputWithError from '../components/ui/TextInputWithError';
import ChooseIcon from '../components/ui/accounts/ChooseIcon';
import { UserContext } from '../components/logic/auth/UserContext';
import { addCashAccount } from '../components/logic/accounts/AddCashAccount';
import { SELECTABLE_ICONS } from '../constants';
import { validateAccountName, validateAccountIcon } from '../components/logic/validation/AccountDataValidation';
import ButtonDisabledOnError from '../components/ui/ButtonDisabledOnError';

export default function AddAccountScreen({ navigation }) {
    const user = useContext(UserContext);

    const [name, setName] = useState('');
    const [icon, setIcon] = useState(SELECTABLE_ICONS[0]);
    const [errors, setErrors] = useState({});

    const onNameChange = (text) => {
        setName(text);
        setErrors({...errors, name: validateAccountName(text)});
    }

    const onIconChange = (text) => {
        setIcon(text);
        setErrors({...errors, icon: validateAccountIcon(text)});
    }

    const onSubmit = () => {
        const newErrors = {
            ...errors,
            name: validateAccountName(name),
            icon: validateAccountIcon(icon),
        };

        setErrors(newErrors);

        if (
            Object.values(newErrors)?.filter((err) => err !== '').length === 0
        ) {
            addCashAccount(user, name, icon);

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
            <ChooseIcon
                selectedIcon={icon}
                setSelectedIcon={onIconChange}
            />
            <TextInputWithError
                mode="outlined"
                label="Custom icon (only native android icons)"
                onChangeText={onIconChange}
                value={icon}
                error={errors.icon}
            />
            <ButtonDisabledOnError
                onPress={onSubmit}
                mode="contained"
                style={styles.addButton}
                errors={errors}
            >
                Add account
            </ButtonDisabledOnError>
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
