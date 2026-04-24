import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default Feedback;
