import mongoose, { Schema } from "mongoose";

const v2UserSchema = new Schema({
    userOnlineId:          { type: String, required: true, unique: true },
    userPrimaryId:         { type: String },
    config:                { type: Schema.Types.Mixed, default: {} },
    lastRepeatProcessed:   { type: Date },
    updatedAt:             { type: Date, default: Date.now },
});

const V2User = mongoose.models.V2User || mongoose.model("V2User", v2UserSchema, "v2_users");

export default V2User;
