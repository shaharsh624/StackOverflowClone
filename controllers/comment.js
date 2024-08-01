const Comment = require("../models/comment");

async function handleGetAllComments(req, res) {
    const allComments = await Comment.find({});
    return res.json(allComments);
}

async function handleCreateComment(req, res) {
    const body = req.body;
    if (!body.body) return res.status(400).json({ error: "body is required" });

    try {
        await Comment.create(body);
        return res.status(201).json({ msg: "Comment Created" });
    } catch (error) {
        return res.json({ error: error });
    }
}

async function handleUpdateCommentById(req, res) {
    const body = req.body;
    if (body.answerId && body.questionId) {
        return res.json({ msg: "Please provide either questionId or answerId" });
    }
    try {
        await Comment.findByIdAndUpdate(body.id, body);
        return res.status(201).json({ msg: "Comment Updated" });
    } catch (error) {
        return res.json({ error: error });
    }
}

async function handleDeleteCommentById(req, res) {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        return res.status(201).json({ msg: "Comment Deleted" });
    } catch (error) {
        return res.json({ error: error });
    }
}

module.exports = {
    handleGetAllComments,
    handleCreateComment,
    handleUpdateCommentById,
    handleDeleteCommentById,
};
