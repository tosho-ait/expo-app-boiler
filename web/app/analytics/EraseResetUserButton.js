'use client';
import { adminEraseResetUser } from "./actions";

export default function EraseResetUserButton({ userId }) {
    return (
        <button
            type="button"
            onClick={async () => {
                if (window.confirm(`Are you SURE you want to erase-reset this user (${userId})? All transactions, circles, friendships, tags and favorites will be permanently deleted. The Clerk account will NOT be deleted.`)) {
                    document.body.style.cursor = 'wait';
                    try {
                        await adminEraseResetUser(userId);
                        alert("User data erased. Clerk account kept.");
                    } catch (e) {
                        alert("Task failed, check console.");
                    }
                    document.body.style.cursor = 'default';
                }
            }}
            className="text-orange-500 hover:text-white hover:bg-orange-500 border border-orange-500 transition-colors font-bold text-xs px-3 py-1 rounded">
            Erase-Reset
        </button>
    );
}
