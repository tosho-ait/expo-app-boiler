import mongoose, { Schema } from "mongoose";

const syncLogSchema = new Schema({
    userId: String,
    username: String,
    timestamp: { type: Date, default: Date.now },
    duration: Number
});

const SyncLog = mongoose.models.SyncLog || mongoose.model("SyncLog", syncLogSchema);

export default SyncLog;
