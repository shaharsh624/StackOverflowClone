const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: false,
    },
    tags: {
        type: [String],
        default: [],
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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

questionSchema.index({ title: "text", body: "text" });
const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
