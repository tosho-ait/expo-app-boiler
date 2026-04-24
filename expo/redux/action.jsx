//

export const LOGOUT_DEVICE = "LOGOUT_DEVICE";
export const LOGOUT_WIPE_DEVICE = "LOGOUT_WIPE_DEVICE";

export const LOGIN_OFFLINE_USER = "LOGIN_OFFLINE_USER";
export const LOGIN_ONLINE_USER = "LOGIN_ONLINE_USER";

export const SYNC_SYNC = "SYNC_SYNC";
export const SYNC_TRY_TIMESTAMP = "SYNC_TRY_TIMESTAMP";
export const SYNC_FAIL_TIMESTAMP = "SYNC_FAIL_TIMESTAMP";

export const SET_PURCHASE_INTENT = "SET_PURCHASE_INTENT";

// V2 action types
export const V2_SAVE_TODO = 'V2_SAVE_TODO';
export const V2_DELETE_TODO = 'V2_DELETE_TODO';
export const V2_SAVE_CONFIG = 'V2_SAVE_CONFIG';
export const V2_SYNC_PULL_COMPLETE = 'V2_SYNC_PULL_COMPLETE';
export const V2_SYNC_PUSH_COMPLETE = 'V2_SYNC_PUSH_COMPLETE';


export const logoutDevice = () => ({
    type: LOGOUT_DEVICE,
    payload: {}
});

export const logoutWipeDevice = () => ({
    type: LOGOUT_WIPE_DEVICE,
    payload: {}
});

export const loginOfflineUser = (userId, defaultCurrency) => ({
    type: LOGIN_OFFLINE_USER,
    payload: { userId, defaultCurrency }
});

export const loginOnlineUser = (userId, defaultCurrency, userPrimaryId) => ({
    type: LOGIN_ONLINE_USER,
    payload: { userId, defaultCurrency, userPrimaryId }
});

export const syncTryTimestamp = (timestamp) => ({
    type: SYNC_TRY_TIMESTAMP,
    payload: timestamp
});

export const syncFailTimestamp = (timestamp) => ({
    type: SYNC_FAIL_TIMESTAMP,
    payload: timestamp
});

export const setPurchaseIntent = (intent) => ({
    type: SET_PURCHASE_INTENT,
    payload: intent
});

export const saveTodo = (t) => ({ type: V2_SAVE_TODO, payload: t });
export const deleteTodo = (todoId) => ({ type: V2_DELETE_TODO, payload: { todoId } });
export const saveConfig = (config) => ({ type: V2_SAVE_CONFIG, payload: config });
export const syncV2PullComplete = (data) => ({ type: V2_SYNC_PULL_COMPLETE, payload: data });
export const syncV2PushComplete = (saved) => ({ type: V2_SYNC_PUSH_COMPLETE, payload: saved });
