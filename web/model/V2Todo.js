import mongoose, { Schema } from "mongoose";

const v2TodoSchema = new Schema({
    todoId:      { type: String, required: true, unique: true },
    ownerId:     { type: String, required: true },
    title:       String,
    note:        String,
    completed:   { type: Boolean, default: false },
    completedAt: Date,
    deletedAt:   Date,
    updatedAt:   { type: Date, required: true },
});

const V2Todo = mongoose.models.V2Todo || mongoose.model("V2Todo", v2TodoSchema, "v2_todos");

export default V2Todo;
