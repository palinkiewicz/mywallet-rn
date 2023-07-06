import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';

export default function DeleteDialog({
    visible,
    onDismiss,
    onConfirm,
    title = 'Delete permamently?',
    paragraphs = [],
}) {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    {paragraphs.map((paragraphText, index) => (
                        <Paragraph key={paragraphText + index}>{paragraphText}</Paragraph>
                    ))}
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>Cancel</Button>
                    <Button onPress={onConfirm}>Remove</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
