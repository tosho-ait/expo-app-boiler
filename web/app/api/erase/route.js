import {checkAuthorized, getUserId} from "../../../lib/check";
import connectMongoDB from "../../../lib/mongodb";
import {respondNotAuthorized, respondReturn, respondServerError} from "../../../lib/respond";
import {auth} from '@clerk/nextjs/server';
import {eraseUserRoutine} from "../../../lib/libErase";
import { logError } from "../../../lib/logger";

export async function GET(request) {
    let userId;
    try {

        const session = await auth();

        if (!checkAuthorized(session)) {
            return respondNotAuthorized();
        }

        userId = getUserId(session);

        await connectMongoDB();

        await eraseUserRoutine({userId});

        return respondReturn();

    } catch (error) {
        logError("erase.get.failed", error, { route: "erase", userId });
        return respondServerError(error);
    }
}
