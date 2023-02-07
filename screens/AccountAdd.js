import { useState, useContext } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Text, Button } from 'react-native-paper';
import TextInputWithHelper from '../components/ui/TextInputWithHelper';
import ChooseIcon from '../components/ui/accounts/ChooseIcon';
import { UserContext } from '../components/logic/auth/UserContext';
import { addCashAccount } from '../components/logic/accounts/AddCashAccount';
import getInitialErrorState from '../components/logic/GetInitialErrorState';
import { SELECTABLE_ICONS } from '../constants';

export default function AddAccountScreen({ navigation }) {
    const user = useContext(UserContext);
    const [accountName, setAccountName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(SELECTABLE_ICONS[0]);
    const [errors, setErrors] = useState(
        getInitialErrorState(['user', 'name', 'icon'])
    );

    const onSubmit = () => {
        let newErrors = addCashAccount(user, accountName, selectedIcon);

        if (Object.keys(newErrors).length === 0) {
            Keyboard.dismiss();
            return navigation.goBack();
        }

        setErrors((prev) => { return {...prev, ...newErrors} });
    };

    return (
        <View style={styles.view}>
            <TextInputWithHelper
                mode="outlined"
                label="Account's name"
                onChangeText={(text) => {
                    setAccountName(text);
                }}
                value={accountName}
                error={errors.name.active}
                helperText={errors.name.msg}
            />
            <ChooseIcon
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
            />
            <Text style={{ marginHorizontal: 16 }} variant="labelSmall">
                Not required:
            </Text>
            <TextInputWithHelper
                mode="outlined"
                label="Custom icon (only native android icons)"
                onChangeText={(text) => {
                    setSelectedIcon(text);
                }}
                value={selectedIcon}
                error={errors.icon.active}
                helperText={errors.icon.msg}
            />
            <Button
                onPress={onSubmit}
                mode="contained"
                style={styles.addButton}
            >
                Add account
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
