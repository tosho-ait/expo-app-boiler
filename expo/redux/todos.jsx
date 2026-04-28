import {
    LOGIN_OFFLINE_USER,
    LOGIN_ONLINE_USER,
    LOGOUT_DEVICE,
    LOGOUT_WIPE_DEVICE,
    V2_DELETE_TODO,
    V2_SAVE_CONFIG,
    V2_SAVE_TODO,
    V2_SYNC_PULL_COMPLETE,
    V2_SYNC_PUSH_COMPLETE,
} from "./action";
import { generateUUID } from "@appboiler/shared/idUtil";


function mergeBy(local, remote, keyFn) {
    const map = {};
    (local || []).forEach(r => { map[keyFn(r)] = r; });
    (remote || []).forEach(r => {
        const k = keyFn(r);
        if (!map[k] || new Date(r.updatedAt) > new Date(map[k].updatedAt)) {
            map[k] = r;
        }
    });
    return Object.values(map);
}

function upsertBy(list, item, keyFn) {
    const key = keyFn(item);
    const idx = list.findIndex(r => keyFn(r) === key);
    if (idx === -1) return [...list, item];
    const updated = [...list];
    updated[idx] = item;
    return updated;
}


const initialState = {

    userPrimaryId: null,
    userOnlineId: null,
    userOnlineIdLastLogin: null,

    // config is sent on every push; conflict resolution happens via
    // config.updatedAt on the server (newer wins).
    config: {
        language: null,
        updatedAt: null,
    },

    // raw records
    todoList: [],

    // Only todos use pendingChanges — config rides along on every push.
    pendingChanges: {
        todos: [],
    },
    lastSyncAt: 0,

    usersInfo: [],

    // derived (sorted + non-deleted)
    todos: [],
};


function buildDerivedTodos(todoList) {
    return (todoList || [])
        .filter(t => !t.deletedAt)
        .slice()
        .sort((a, b) => {
            if (a.completed !== b.completed) return a.completed ? 1 : -1;
            const ua = new Date(a.updatedAt || 0).getTime();
            const ub = new Date(b.updatedAt || 0).getTime();
            return ub - ua;
        });
}


const todosReducer = (state = initialState, action) => {

    try {

        let {
            todoList = [],
            usersInfo = [],
            config,
            userOnlineIdLastLogin,
            userOnlineId,
            userPrimaryId,
        } = state;

        let pendingChanges = state.pendingChanges || { todos: [] };
        if (!pendingChanges.todos) pendingChanges = { ...pendingChanges, todos: [] };

        switch (action.type) {

            case V2_SAVE_TODO: {
                const existing = todoList.find(r => r.todoId === action.payload.todoId);
                const t = {
                    ...(existing || {}),
                    ...action.payload,
                    updatedAt: new Date().toISOString(),
                };
                todoList = upsertBy(todoList, t, r => r.todoId);
                pendingChanges = {
                    ...pendingChanges,
                    todos: upsertBy(pendingChanges.todos || [], t, r => r.todoId),
                };
                return {
                    ...state,
                    todoList,
                    todos: buildDerivedTodos(todoList),
                    pendingChanges,
                };
            }

            case V2_DELETE_TODO: {
                const { todoId } = action.payload;
                const now = new Date().toISOString();
                todoList = todoList.map(t => t.todoId === todoId ? { ...t, deletedAt: now, updatedAt: now } : t);
                const deleted = todoList.find(t => t.todoId === todoId);
                if (deleted) {
                    pendingChanges = {
                        ...pendingChanges,
                        todos: upsertBy(pendingChanges.todos || [], deleted, r => r.todoId),
                    };
                }
                return {
                    ...state,
                    todoList,
                    todos: buildDerivedTodos(todoList),
                    pendingChanges,
                };
            }

            case V2_SAVE_CONFIG: {
                // Bump updatedAt so the server can pick newer-wins on push.
                const newConfig = {
                    ...config,
                    ...action.payload,
                    updatedAt: new Date().toISOString(),
                };
                return { ...state, config: newConfig };
            }

            case V2_SYNC_PULL_COMPLETE: {
                const {
                    todos: remoteTodos = [],
                    usersInfo: remoteUsersInfo,
                    config: remoteConfig,
                    serverTime,
                } = action.payload;

                const newTodoList = mergeBy(todoList, remoteTodos, r => r.todoId);

                let newUsersInfo = [...usersInfo];
                if (remoteUsersInfo?.length > 0) {
                    remoteUsersInfo.forEach(remote => {
                        const idx = newUsersInfo.findIndex(u => u.userId === remote.userId);
                        if (idx !== -1) newUsersInfo[idx] = remote;
                        else newUsersInfo.push(remote);
                    });
                }

                const pulledTodoIds = new Set(remoteTodos.map(t => t.todoId));
                const newPendingChanges = {
                    todos: (pendingChanges.todos || []).filter(p => !pulledTodoIds.has(p.todoId)),
                };

                // Newer-wins via updatedAt. If the remote has no updatedAt
                // (legacy / fresh user) we keep whatever we have locally.
                const localTs = config?.updatedAt ? new Date(config.updatedAt).getTime() : 0;
                const remoteTs = remoteConfig?.updatedAt ? new Date(remoteConfig.updatedAt).getTime() : 0;
                const newConfig = remoteConfig && remoteTs > localTs
                    ? { ...config, ...remoteConfig }
                    : config;

                return {
                    ...state,
                    todoList: newTodoList,
                    todos: buildDerivedTodos(newTodoList),
                    usersInfo: newUsersInfo,
                    config: newConfig,
                    lastSyncAt: serverTime || state.lastSyncAt,
                    pendingChanges: newPendingChanges,
                };
            }

            case V2_SYNC_PUSH_COMPLETE: {
                const { todos: savedTodos = [] } = action.payload || {};
                const savedSet = new Set(savedTodos);
                return {
                    ...state,
                    pendingChanges: {
                        todos: (pendingChanges.todos || []).filter(p => !savedSet.has(p.todoId)),
                    },
                };
            }

            case LOGOUT_DEVICE: {
                return {
                    ...state,
                    userOnlineId: null,
                    userPrimaryId: null,
                };
            }

            case LOGOUT_WIPE_DEVICE: {
                return { ...initialState };
            }

            case LOGIN_OFFLINE_USER: {
                const { userId, language: loginLanguage } = action.payload;
                // Carry the language picked in onboarding into post-reset state,
                // and stamp updatedAt so the next push wins on the server.
                return {
                    ...initialState,
                    userPrimaryId: userId,
                    userOnlineId: null,
                    config: loginLanguage
                        ? { ...initialState.config, language: loginLanguage, updatedAt: new Date().toISOString() }
                        : initialState.config,
                };
            }

            case LOGIN_ONLINE_USER: {
                let { userId, userPrimaryId: payloadPrimaryId, language: loginLanguage } = action.payload;
                userId = userId?.toLowerCase();
                const newPrimaryId = payloadPrimaryId || state.userPrimaryId || generateUUID();

                let stateForLogin = state;
                if (userOnlineIdLastLogin && userOnlineIdLastLogin !== userId) {
                    stateForLogin = initialState;
                }

                return {
                    ...stateForLogin,
                    userPrimaryId: newPrimaryId,
                    userOnlineId: userId,
                    userOnlineIdLastLogin: userId,
                    config: loginLanguage
                        ? { ...stateForLogin.config, language: loginLanguage, updatedAt: new Date().toISOString() }
                        : stateForLogin.config,
                };
            }

            default:
                return state;
        }

    } catch (e) {
        console.error("todos reducer error", e);
    }

    return state;
};

export default todosReducer;
