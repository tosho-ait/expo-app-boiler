import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doV2Push, doV2Pull } from "../../lib/fetchUtil";
import { usePathname } from "expo-router";
import { syncFailTimestamp, syncTryTimestamp } from "../../redux/action";
import { useAppSession } from "@/components/providers/AppSessionProvider";


const SYNC_INTERVAL_MIN_RETRY_ON_FAILED = 4 * 60 * 1000; // 4 min
const SYNC_INTERVAL_MIN_DELAY = 15_000; // 15 sec

const SYNC_INTERVAL_MIN_DELAY_SAFEGUARD_RUNNING = 150_000; // must be same as timeout

const SYNC_INTERVAL_WHEN_DIRTY = 2 * 1000; // 2 sec
const SYNC_INTERVAL_NOT_DIRTY = 120 * 60 * 1000; // 2 hours

export default function AccountSync() {

    const dispatch = useDispatch();
    const pathname = usePathname();

    // const { rcUser } = useAppSession();
    const { isUserOnlineSignedIn, getToken } = useAppSession();

    let pendingChanges = useSelector(state => state.todos.pendingChanges);
    let config = useSelector(state => state.todos.config);
    let lastSyncAt = useSelector(state => state.todos.lastSyncAt) || 0;

    let dirtyTimestamp = useSelector(state => state.sync?.dirtyTimestamp);

    let lastSyncTry = useSelector(state => state.sync?.lastSyncTryTimestamp);
    let lastSyncSuccess = useSelector(state => state.sync?.lastSyncSuccessTimestamp);
    let lastSyncFail = useSelector(state => state.sync?.lastSyncFailTimestamp);

    let lastSyncFailed = !!lastSyncFail && lastSyncFail > lastSyncSuccess;

    let syncCurry = () => {

        let now = new Date().getTime();

        let timeSinceLastSyncTry = now - lastSyncTry;
        let timeSinceLastSyncSuccess = now - lastSyncSuccess;
        let timeSinceLastSyncFail = now - lastSyncFail;

        let isDirty = !!dirtyTimestamp;

        // TODO put the doISync calculation logic in a seperate function

        let doISync = false;

        if (lastSyncTry === 0) {
            doISync = true;
        }
        if (isDirty && timeSinceLastSyncSuccess > SYNC_INTERVAL_WHEN_DIRTY) {
            doISync = true;
        }
        if (timeSinceLastSyncSuccess > SYNC_INTERVAL_NOT_DIRTY) {
            doISync = true;
        }
        if (doISync && lastSyncFailed && timeSinceLastSyncTry < SYNC_INTERVAL_MIN_RETRY_ON_FAILED) {
            doISync = false;
        }
        if (doISync && timeSinceLastSyncSuccess < SYNC_INTERVAL_MIN_DELAY) {
            doISync = false;
        }
        if (doISync && timeSinceLastSyncTry < SYNC_INTERVAL_MIN_DELAY) {
            doISync = false;
        }

        if (doISync
            && timeSinceLastSyncTry < timeSinceLastSyncSuccess
            && timeSinceLastSyncTry < timeSinceLastSyncFail
            && timeSinceLastSyncTry < SYNC_INTERVAL_MIN_DELAY_SAFEGUARD_RUNNING) {
            doISync = false;
        }


        if (isUserOnlineSignedIn && doISync) {

            dispatch(syncTryTimestamp(now));

            const onFail = () => {
                dispatch(syncFailTimestamp(now));
            };

            (async () => {
                let pushFailed = false;
                await doV2Push({ pendingChanges, config, getToken, dispatch, onFail: () => { pushFailed = true; onFail(); } });
                if (!pushFailed) {
                    await doV2Pull({ lastSyncAt, getToken, dispatch, onFail });
                }
            })();

        }

    };

    useEffect(() => {
        if (dispatch && isUserOnlineSignedIn) {
            syncCurry();
        }
    }, [dispatch, isUserOnlineSignedIn, pathname, dirtyTimestamp]);

    return <></>;
}
