import mongoose, {Schema} from "mongoose";

const userInfoSchema = new Schema({

    userId: Schema.Types.String,
    userLabel: Schema.Types.String,
    userImageUrl: Schema.Types.String,
    lastUpdated: {type: Date, default: Date.now}

});

const UserInfo = mongoose.models.UserInfo || mongoose.model("UserInfo", userInfoSchema);

export default UserInfo;
