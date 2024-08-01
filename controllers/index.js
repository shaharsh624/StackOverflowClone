const Answer = require("../models/answer");
const Comment = require("../models/comment");
const Question = require("../models/question");
const User = require("../models/user");

async function handleHelloWorld(req, res) {
    return res.json({ msg: "Hello World" });
}

async function handleUpdateVoteById(req, res) {
    const body = req.body;
    const update = {};
    if (body.vote === "upvote") {
        update.$inc = { "votes.upvotes": 1 };
    } else if (body.vote === "downvote") {
        update.$inc = { "votes.downvotes": 1 };
    } else {
        return res.json({ msg: "Please provide correct vote parameter" });
    }
    try {
        if (body.questionId && body.answerId) {
            return res.json({ msg: "Please provide correct parameter" });
        } else if (body.questionId) {
            await Question.findByIdAndUpdate(body.questionId, update);
        } else if (body.answerId) {
            await Answer.findByIdAndUpdate(body.answerId, update);
        }
        return res.status(201).json({ msg: "Votes Updated" });
    } catch (error) {
        return res.json({ error: error });
    }
}

async function handleSearch(req, res) {
    const { searchFor, query } = req.query;
    if (!query)
        return res.status(400).json({ msg: "please provide a search query" });
    try {
        if (searchFor == "question") {
            const results = await Question.find(
                { $text: { $search: query } },
                { score: { $meta: "textScore" } }
            ).sort({ score: { $meta: "textScore" } });
            return res.status(201).json(results);
        } else if (searchFor == "answer") {
            const results = await Answer.find(
                { $text: { $search: query } },
                { score: { $meta: "textScore" } }
            ).sort({ score: { $meta: "textScore" } });
            return res.status(201).json(results);
        }
    } catch (error) {
        return res.json({ error: error });
    }
}

module.exports = {
    handleHelloWorld,
    handleUpdateVoteById,
    handleSearch,
};
