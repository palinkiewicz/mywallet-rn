import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';

export default function DeleteDialog({
    removeData,
    setRemoveData,
    onConfirm,
    title = 'Delete permamently?',
    paragraphs = [],
}) {
    const dismiss = () => {
        setRemoveData((current) => ({
            ...current,
            active: false,
        }));
    };

    return (
        <Portal>
            <Dialog visible={removeData.active} onDismiss={dismiss}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    {paragraphs.map((paragraphText, index) => (
                        <Paragraph key={paragraphText + index}>
                            {paragraphText}
                        </Paragraph>
                    ))}
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={dismiss}>Cancel</Button>
                    <Button onPress={onConfirm}>Remove</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
