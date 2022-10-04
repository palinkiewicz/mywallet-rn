import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import removeCashAccountHistory from '../../logic/accounts/RemoveCashAccountHistory';

export default function AccountHistoryRemoveDialog({ removeData, setRemoveData }) {
    return (
        <Portal>
            <Dialog
                visible={removeData.active}
                onDismiss={() => {
                    setRemoveData((current) => ({
                        ...current,
                        active: false,
                    }));
                }}
            >
                <Dialog.Title>Delete permamently?</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Record will be removed permamently.</Paragraph>
                    <Paragraph>You cannot recover it after this.</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        onPress={() => {
                            setRemoveData((current) => ({
                                ...current,
                                active: false,
                            }));
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onPress={() => {
                            console.log(removeData.accountId);
                            console.log(removeData.index);
                            removeCashAccountHistory(removeData.accountId, removeData.index, removeData.history);
                        }}
                    >
                        Remove
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
