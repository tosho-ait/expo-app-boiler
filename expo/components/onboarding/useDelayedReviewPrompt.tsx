import {useEffect, useRef} from 'react';
import * as StoreReview from 'expo-store-review';


export function useDelayedReviewPrompt() {
    const hasRequestedRef = useRef(false);

    useEffect(() => {
        (async () => {
            if (hasRequestedRef.current) return;

            const available = await StoreReview.isAvailableAsync();

            if (available) {
                hasRequestedRef.current = true;
                await StoreReview.requestReview();
            }
        })();
    }, []);
}
