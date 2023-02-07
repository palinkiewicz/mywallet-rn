import { useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Text, Button } from 'react-native-paper';
import TextInputWithHelper from '../components/ui/TextInputWithHelper';
import { updateCashAccount } from '../components/logic/accounts/UpdateCashAccount';
import getInitialErrorState from '../components/logic/GetInitialErrorState';
import ChooseIcon from '../components/ui/accounts/ChooseIcon';

export default function EditAccountScreen({ navigation, route }) {
    const { docId, name, icon } = route.params;

    const [accountName, setAccountName] = useState(name);
    const [selectedIcon, setSelectedIcon] = useState(icon);
    const [errors, setErrors] = useState(getInitialErrorState(['document', 'name', 'icon']));

    const onSubmit = () => {
        let newErrors = updateCashAccount(docId, accountName, selectedIcon);

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
                style={styles.editButton}
            >
                Edit account
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
