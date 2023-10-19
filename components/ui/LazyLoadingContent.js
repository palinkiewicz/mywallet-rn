import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-native-paper';

/**
 * A component that initially renders a progress bar
 * that is being replaced with the provided children later,
 * along with the calling of the provided callback function.
 */
export default function LazyLoadingContent({ children, callback }) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // The 10ms timeout is used here because I want to first fully render the component
        // and then replace its content with the provided children.
        setTimeout(() => {
            setReady(true);
            callback?.();
        }, 10);
    }, []);

    return ready ? children : <ProgressBar indeterminate />;
}
