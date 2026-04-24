"use server";

import connectMongoDB from "../../lib/mongodb";
import { eraseUserRoutine, eraseResetUserRoutine } from "../../lib/libErase";
import { revalidatePath } from "next/cache";

export async function adminEraseUser(userId) {
    if (!userId) {
        console.warn("adminEraseUser aborted: No User ID provided");
        return false;
    }
    
    try {
        console.log(`[Admin Action] Proceeding to erase user ${userId}`);
        await connectMongoDB();
        await eraseUserRoutine({ userId });
        revalidatePath("/analytics");
        return true;
    } catch (error) {
        console.error("Admin erase execution error:", error);
        return false;
    }
}

export async function adminEraseResetUser(userId) {
    if (!userId) {
        console.warn("adminEraseResetUser aborted: No User ID provided");
        return false;
    }

    try {
        console.log(`[Admin Action] Proceeding to erase-reset user ${userId}`);
        await connectMongoDB();
        await eraseResetUserRoutine({ userId });
        revalidatePath("/analytics");
        return true;
    } catch (error) {
        console.error("Admin erase-reset execution error:", error);
        return false;
    }
}
