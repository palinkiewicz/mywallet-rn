import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import removeCashAccount from '../../logic/accounts/RemoveCashAccount';

export default function AccountRemoveDialog({ removeData, setRemoveData }) {
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
                    <Paragraph>Account will be removed permamently.</Paragraph>
                    <Paragraph>
                        You cannot recover account after this.
                    </Paragraph>
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
                            removeCashAccount(removeData.accountId);
                        }}
                    >
                        Remove
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
