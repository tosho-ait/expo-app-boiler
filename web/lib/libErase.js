import { createClerkClient } from '@clerk/backend';
import V2Todo from "../model/V2Todo";
import V2User from "../model/V2User";
import UserInfo from "../model/UserInfo";

export async function eraseUserRoutine({ userId }) {

    console.log("Erasing user routine for: ", userId);

    if (!userId) {
        console.log("No exact userId (email) found to erase local DB footprints.");
        return;
    }

    await V2Todo.deleteMany({ ownerId: userId });
    await V2User.deleteMany({ userOnlineId: userId });
    await UserInfo.deleteMany({ userId });

    try {
        const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
        const users = await clerkClient.users.getUserList({ emailAddress: [userId] });
        if (users.data && users.data.length > 0) {
            for (const clerkUser of users.data) {
                await clerkClient.users.deleteUser(clerkUser.id);
                console.log("Clerk user deleted:", clerkUser.id);
            }
        }
    } catch (error) {
        console.error("Failed to delete Clerk user:", error);
    }

    console.log("Erase complete for:", userId);
}

export async function eraseResetUserRoutine({ userId }) {

    console.log("Erase-reset routine for: ", userId);

    if (!userId) {
        console.log("No userId provided for erase-reset.");
        return;
    }

    await V2Todo.deleteMany({ ownerId: userId });

    console.log("Erase-reset complete for:", userId);
}
