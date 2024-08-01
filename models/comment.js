const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
    },
    answerId: {
        type: Schema.Types.ObjectId,
        ref: "Answer",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
