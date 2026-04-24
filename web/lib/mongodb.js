import mongoose from "mongoose";

const connectMongoDB = async () => {

    try {

        if (mongoose.connection?.readyState === 1) {
            return;
        }

        // console.log("MongoDB connecting to: ", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);

    } catch (error) {
        console.error("MongoDB connection error:", error);
        console.log(error);

    }

}

export default connectMongoDB;