import { auth } from "@clerk/nextjs/server";
import { checkAuthorized, getUserId } from "../../../../../lib/check";
import connectMongoDB from "../../../../../lib/mongodb";
import { respondNotAuthorized, respondReturnJson, respondReturn, respondServerError } from "../../../../../lib/respond";
import { logError } from "../../../../../lib/logger";
import V2Todo from "../../../../../model/V2Todo";
import V2User from "../../../../../model/V2User";

export async function OPTIONS() {
    return respondReturn();
}

async function findForeignOwnedIds(Model, idField, ids, userId) {
    if (!ids.length) return new Set();
    const existing = await Model.find({ [idField]: { $in: ids } })
        .select(`${idField} ownerId`)
        .lean();
    return new Set(
        existing.filter(e => e.ownerId && e.ownerId !== userId).map(e => e[idField])
    );
}

export async function POST(request) {
    let userId;
    try {
        const session = await auth();

        if (!checkAuthorized(session)) {
            return respondNotAuthorized();
        }

        userId = getUserId(session);
        if (!userId) return respondNotAuthorized();

        await connectMongoDB();

        const body = await request.json();
        const { todos = [], config } = body;

        const serverTime = new Date();

        const saved = { todos: [], config: false };

        const validTodos = todos.filter(t => !!t.todoId);
        const foreignIds = await findForeignOwnedIds(V2Todo, 'todoId', validTodos.map(t => t.todoId), userId);
        for (const t of validTodos) {
            if (foreignIds.has(t.todoId)) continue;
            const { _id, __v, ownerId: _clientOwnerId, ...fields } = t;
            await V2Todo.findOneAndUpdate(
                { todoId: t.todoId },
                { $set: { ...fields, updatedAt: serverTime }, $setOnInsert: { ownerId: userId } },
                { upsert: true, new: true }
            );
            saved.todos.push(t.todoId);
        }

        if (config?.defaultCurrency) {
            await V2User.findOneAndUpdate(
                { userOnlineId: userId },
                { $set: { "config.defaultCurrency": config.defaultCurrency, updatedAt: new Date() } },
                { upsert: true }
            );
            saved.config = true;
        }

        return respondReturnJson({ serverTime: serverTime.getTime(), saved });

    } catch (error) {
        logError("v2.push.failed", error, { route: "v2/sync/push", userId });
        return respondServerError(error);
    }
}
