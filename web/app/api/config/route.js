import { checkAuthorized, getUserId } from "../../../lib/check";
import connectMongoDB from "../../../lib/mongodb";
import { respondNotAuthorized, respondReturnJson, respondServerError } from "../../../lib/respond";
import { logError } from "../../../lib/logger";
import { auth } from "@clerk/nextjs/server";
import V2User from "../../../model/V2User";


export async function GET(request) {

    let userId;
    try {

        const session = await auth();

        if (!checkAuthorized(session)) {
            return respondNotAuthorized();
        }

        userId = getUserId(session);

        await connectMongoDB();

        const v2user = await V2User.findOne({ userOnlineId: userId }).lean();

        if (v2user) {
            return respondReturnJson({
                userPrimaryId: v2user.userPrimaryId,
                language: v2user.config?.language || null,
            });
        }

        return respondServerError("no config found");

    } catch (error) {
        logError("config.get.failed", error, { route: "config", method: "GET", userId });
        return respondServerError(error);
    }
}

export async function POST(request) {

    let userId;
    try {
        const session = await auth();

        if (!checkAuthorized(session)) {
            return respondNotAuthorized();
        }

        userId = getUserId(session);
        const body = await request.json();
        let { primaryId } = body;

        await connectMongoDB();

        const existing = await V2User.findOne({ userOnlineId: userId }).lean();

        if (existing) {
            return respondReturnJson({
                userPrimaryId: existing.userPrimaryId,
                language: existing.config?.language || null,
            });
        }

        const newPrimaryId = primaryId || crypto.randomUUID();

        const v2user = await V2User.create({
            userOnlineId: userId,
            userPrimaryId: newPrimaryId,
            config: {},
            updatedAt: new Date(),
        });

        return respondReturnJson({
            userPrimaryId: v2user.userPrimaryId,
            language: v2user.config?.language || null,
        });

    } catch (error) {
        logError("config.post.failed", error, { route: "config", method: "POST", userId });
        return respondServerError(error);
    }
}
