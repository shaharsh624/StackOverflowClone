const mongoose = require("mongoose");
const { Schema } = mongoose;

const answerSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    votes: {
        upvotes: {
            type: Number,
            default: 0,
        },
        downvotes: {
            type: Number,
            default: 0,
        },
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

answerSchema.index({ body: "text" });
const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
