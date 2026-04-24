import { syncV2PullComplete, syncV2PushComplete } from "../redux/action";
import axios from "axios";

export const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

const timeout = 150_000;

export async function fetchErase({ onSuccess, getToken }) {
    try {
        const response = await axios.get(API_URL + "/api/erase", {
            timeout,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`,
            },
        });
        if (response.status === 200) {
            onSuccess && await onSuccess();
        }
    } catch (error) {
        console.error('Error fetching data: /api/erase ', error);
    }
}

export async function fetchConfig({ getToken, primaryId }) {
    try {
        const body = { primaryId };
        const response = await axios.post(API_URL + "/api/config", body, {
            timeout,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.warn('Error fetching config: ', error);
    }
}

export async function doV2Push({ pendingChanges, getToken, dispatch, onFail }) {
    const { todos = [], config } = pendingChanges || {};
    const hasPending = todos.length > 0 || config;
    if (!hasPending) return;

    try {
        const token = await getToken();

        const body = {
            todos,
            config: config?.defaultCurrency ? { defaultCurrency: config.defaultCurrency } : null,
        };

        const response = await axios.post(API_URL + "/api/v2/sync/push", body, {
            timeout,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            dispatch(syncV2PushComplete(response.data.saved));
        } else {
            onFail && onFail();
        }
    } catch (error) {
        console.error('Error in doV2Push:', error);
        onFail && onFail();
    }
}

export async function doV2Pull({ lastSyncAt, getToken, dispatch, onFail }) {
    try {
        const token = await getToken();

        const response = await axios.get(`${API_URL}/api/v2/sync/pull?since=${lastSyncAt || 0}`, {
            timeout,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            dispatch(syncV2PullComplete(response.data));
        } else {
            onFail && onFail();
        }
    } catch (error) {
        console.error('Error in doV2Pull:', error);
        onFail && onFail();
    }
}

export async function fetchFeedback({ text, email, onSuccess, onFail }) {
    try {
        const response = await axios.post(API_URL + "/api/feedback", { text, email }, {
            timeout,
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 201) {
            onSuccess && onSuccess();
        } else {
            onFail && onFail();
        }
    } catch (error) {
        console.error('Error fetching data /api/feedback :', error);
        onFail && onFail();
    }
}
