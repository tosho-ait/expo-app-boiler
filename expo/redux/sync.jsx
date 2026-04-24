import {
    LOGIN_OFFLINE_USER,
    LOGIN_ONLINE_USER,
    LOGOUT_DEVICE,
    LOGOUT_WIPE_DEVICE,
    SYNC_SYNC,
    SYNC_FAIL_TIMESTAMP,
    SYNC_TRY_TIMESTAMP,
    V2_SAVE_TODO,
    V2_DELETE_TODO,
    V2_SAVE_CONFIG,
    V2_SYNC_PULL_COMPLETE,
} from "./action";

const initialState = {
    dirtyTimestamp: 0,
    lastSyncTryTimestamp: 0,
    lastSyncSuccessTimestamp: 0,
    lastSyncFailTimestamp: 0,
};

export default function syncReducer(state = initialState, action) {
    if (!action || !action.type) {
        return state;
    }

    switch (action.type) {
        case LOGOUT_DEVICE:
        case LOGOUT_WIPE_DEVICE:
        case LOGIN_OFFLINE_USER:
        case LOGIN_ONLINE_USER: {
            return { ...initialState };
        }

        case SYNC_SYNC: {
            return {
                ...state,
                dirtyTimestamp: 0,
                lastSyncSuccessTimestamp: new Date().getTime(),
            };
        }

        case SYNC_TRY_TIMESTAMP: {
            return { ...state, lastSyncTryTimestamp: action.payload };
        }

        case SYNC_FAIL_TIMESTAMP: {
            return { ...state, lastSyncFailTimestamp: action.payload };
        }

        case V2_SAVE_TODO:
        case V2_DELETE_TODO:
        case V2_SAVE_CONFIG: {
            return { ...state, dirtyTimestamp: new Date().getTime() };
        }

        case V2_SYNC_PULL_COMPLETE: {
            const newDirtyTimestamp = state.dirtyTimestamp > state.lastSyncTryTimestamp
                ? state.dirtyTimestamp
                : 0;
            return {
                ...state,
                dirtyTimestamp: newDirtyTimestamp,
                lastSyncSuccessTimestamp: new Date().getTime(),
            };
        }

        default:
            return state;
    }
}
