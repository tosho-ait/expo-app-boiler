import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import { checkAuthorized, getUserId } from "../../../../../lib/check";
import connectMongoDB from "../../../../../lib/mongodb";
import { respondNotAuthorized, respondReturnJson, respondReturn, respondServerError } from "../../../../../lib/respond";
import { logError, logWarn } from "../../../../../lib/logger";
import V2Todo from "../../../../../model/V2Todo";
import UserInfo from "../../../../../model/UserInfo";
import V2User from "../../../../../model/V2User";

export async function OPTIONS() {
    return respondReturn();
}

async function fetchUsersInfo(allUserIds) {
    if (allUserIds.size === 0) return [];

    let usersInfo = await UserInfo.find({ userId: { $in: [...allUserIds] } }).lean();

    const updateThreshold = new Date();
    updateThreshold.setDate(updateThreshold.getDate() - 5);
    const idsToRefresh = [...allUserIds].filter(uid => {
        const info = usersInfo.find(u => u.userId === uid);
        return !info || new Date(info.lastUpdated) < updateThreshold;
    });

    if (idsToRefresh.length > 0) {
        try {
            const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
            const clerkResp = await clerkClient.users.getUserList({ emailAddress: idsToRefresh });
            for (const clerkUser of clerkResp?.data || []) {
                const matchingId = idsToRefresh.find(uid =>
                    clerkUser.emailAddresses?.some(e => e.emailAddress.toLowerCase() === uid.toLowerCase())
                );
                if (matchingId) {
                    const updated = {
                        userId: matchingId,
                        userLabel: clerkUser.fullName || null,
                        userImageUrl: clerkUser.imageUrl,
                        lastUpdated: new Date(),
                    };
                    await UserInfo.findOneAndUpdate(
                        { userId: matchingId },
                        { $set: updated },
                        { upsert: true }
                    );
                    const idx = usersInfo.findIndex(u => u.userId === matchingId);
                    if (idx !== -1) usersInfo[idx] = updated;
                    else usersInfo.push(updated);
                }
            }
        } catch (e) {
            logWarn("v2.pull.userinfo_refresh_failed", {
                route: "v2/sync/pull",
                idsToRefreshCount: idsToRefresh.length,
                error: { message: e?.message || String(e), name: e?.name },
            });
        }
    }

    return usersInfo;
}

export async function GET(request) {
    let userId;
    try {
        const session = await auth();

        if (!checkAuthorized(session)) {
            return respondNotAuthorized();
        }

        userId = getUserId(session);
        if (!userId) return respondNotAuthorized();

        await connectMongoDB();

        const { searchParams } = new URL(request.url);
        const since = new Date(parseInt(searchParams.get("since")) || 0);

        const v2user = await V2User.findOne({ userOnlineId: userId }).select("config").lean();
        const config = v2user?.config || {};

        const todos = await V2Todo.find({
            ownerId: userId,
            updatedAt: { $gt: since },
        }).select('-_id -__v').lean();

        const usersInfo = await fetchUsersInfo(new Set([userId]));

        const serverTime = Date.now();

        return respondReturnJson({ todos, usersInfo, config, serverTime });

    } catch (error) {
        logError("v2.pull.failed", error, { route: "v2/sync/pull", userId });
        return respondServerError(error);
    }
}
