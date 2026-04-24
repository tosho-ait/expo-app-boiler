'use client';
import { adminEraseUser } from "./actions";

export default function EraseUserButton({ userId }) {
    return (
        <button 
            type="button"
            onClick={async () => {
                if (window.confirm(`Are you SURE you want to permanently erase this user (${userId})? This cannot be undone.`)) {
                    document.body.style.cursor = 'wait';
                    try {
                        await adminEraseUser(userId);
                        alert("User successfully erased from DB and Auth");
                    } catch (e) {
                        alert("Task failed, check console.");
                    }
                    document.body.style.cursor = 'default';
                }
            }}
            className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500 transition-colors font-bold text-xs px-3 py-1 rounded">
            Erase
        </button>
    );
}
