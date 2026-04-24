import connectMongoDB from "../../lib/mongodb";
import Feedback from "../../model/Feedback";
import SyncLog from "../../model/SyncLog";
import V2User from "../../model/V2User";
import { createClerkClient } from "@clerk/backend";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import EraseUserButton from "./EraseUserButton";
import EraseResetUserButton from "./EraseResetUserButton";

export default async function AnalyticsPage() {

    const user = await currentUser();

    const allowedEmail = process.env.ADMIN_EMAIL;
    const isDevelopment = process.env.NODE_ENV === "development";

    const isAllowed = isDevelopment || (allowedEmail && user?.emailAddresses?.some(e => e.emailAddress === allowedEmail));

    if (!isAllowed) {
        redirect("/");
    }

    await connectMongoDB();

    const logs = await SyncLog.find().sort({ timestamp: -1 }).limit(20);
    const feedbacks = await Feedback.find().sort({ timestamp: -1 }).limit(30);
    const userConfigs = await V2User.find().select('userOnlineId userPrimaryId config').limit(100).lean();

    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    let users = { data: [] };

    try {
        users = await clerkClient.users.getUserList({ limit: 100 });
        if (users.data) {
            users.data.sort((a, b) => {
                const dateA = a.lastSignInAt ? new Date(a.lastSignInAt).getTime() : 0;
                const dateB = b.lastSignInAt ? new Date(b.lastSignInAt).getTime() : 0;
                return dateB - dateA;
            });
        }
    } catch (error) {
        console.error("Failed to fetch Clerk users:", JSON.stringify(error));
    }

    return (
        <div className="container mx-auto p-10">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    <SignOutButton />
                </div>
            </div>

            <div className="overflow-x-auto mb-16">
                <h2 className="text-2xl font-bold mb-4">Sync Calls</h2>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-4 text-left font-semibold text-black">Timestamp</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">User ID</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">Duration (ms)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log._id} className="border-b hover:bg-gray-50 text-black">
                                <td className="py-3 px-4">{new Date(log.timestamp).toLocaleString()}</td>
                                <td className="py-3 px-4 font-mono text-xs">{log.userId}</td>
                                <td className="py-3 px-4">{log.duration}</td>
                            </tr>
                        ))}
                        {logs.length === 0 && (
                            <tr>
                                <td colSpan="3" className="py-4 text-center text-gray-500">No sync activity yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="overflow-x-auto mb-16">
                <h2 className="text-2xl font-bold mb-4">User Feedback</h2>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-4 text-left font-semibold text-black">Timestamp</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">Email</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback._id} className="border-b hover:bg-gray-50 text-black">
                                <td className="py-3 px-4 w-48 whitespace-nowrap">{new Date(feedback.timestamp).toLocaleString()}</td>
                                <td className="py-3 px-4 w-64">{feedback.email || "-"}</td>
                                <td className="py-3 px-4">{feedback.text}</td>
                            </tr>
                        ))}
                        {feedbacks.length === 0 && (
                            <tr>
                                <td colSpan="3" className="py-4 text-center text-gray-500">No feedback yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="overflow-x-auto mb-16">
                <h2 className="text-2xl font-bold mb-4">Users</h2>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-4 text-left font-semibold text-black">Online ID</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">Primary ID</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">Config</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userConfigs.map((configRecord) => (
                            <tr key={configRecord._id?.toString()} className="border-b hover:bg-gray-50 text-black">
                                <td className="py-3 px-4 font-mono text-xs">{configRecord.userOnlineId || "-"}</td>
                                <td className="py-3 px-4 font-mono text-xs">{configRecord.userPrimaryId || "-"}</td>
                                <td className="py-3 px-4 font-mono text-xs truncate max-w-xs">{JSON.stringify(configRecord.config)}</td>
                                <td className="py-3 px-4 flex gap-2">
                                    <EraseResetUserButton userId={configRecord.userOnlineId || ""} />
                                    <EraseUserButton userId={configRecord.userOnlineId || ""} />
                                </td>
                            </tr>
                        ))}
                        {userConfigs.length === 0 && (
                            <tr>
                                <td colSpan="4" className="py-4 text-center text-gray-500">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="overflow-x-auto">
                <h2 className="text-2xl font-bold mb-4">Clerk Activity (Last Login)</h2>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-4 text-left font-semibold text-black">Name</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">Email</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">Last Sign In</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((u) => (
                            <tr key={u.id} className="border-b hover:bg-gray-50 text-black">
                                <td className="py-3 px-4">{u.firstName} {u.lastName}</td>
                                <td className="py-3 px-4">{u.emailAddresses?.[0]?.emailAddress}</td>
                                <td className="py-3 px-4">{u.lastSignInAt ? new Date(u.lastSignInAt).toLocaleString() : 'Never'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
