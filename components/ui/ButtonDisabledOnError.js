import { Button } from 'react-native-paper';

export default function ButtonDisabledOnError({ children, onPress, mode, style, errors }) {
    return (
        <Button
            onPress={onPress}
            mode={mode}
            style={style}
            disabled={Object.values(errors)?.filter((err) => err !== '').length > 0}
        >
            {children}
        </Button>
    );
}
