const Question = require("../models/question");

async function handleGetAllQuestions(req, res) {
    const allQuestions = await Question.find({});
    return res.json(allQuestions);
}

async function handleCreateQuestion(req, res) {
    const body = req.body;
    if (!body.title)
        return res.status(400).json({ error: "title is required" });

    try {
        await Question.create({
            title: body.title,
            body: body.body,
            tags: body.tags,
            userId: body.userId,
        });
        return res.status(201).json({ msg: "Question Created" });
    } catch (error) {
        return res.json({ error: error });
    }
}

async function handleUpdateQuestionById(req, res) {
    const body = req.body;
    const _id = body.id;
    delete body.id;
    try {
        await Question.findByIdAndUpdate(body.id, body);
        return res.status(201).json({ msg: "Question Updated" });
    } catch (error) {
        return res.json({ error: error });
    }
}

async function handleDeleteQuestionById(req, res) {
    try {
        await Question.findByIdAndDelete(req.params.id);
        return res.status(201).json({ msg: "Question Deleted" });
    } catch (error) {
        return res.json({ error: error });
    }
}

module.exports = {
    handleGetAllQuestions,
    handleCreateQuestion,
    handleUpdateQuestionById,
    handleDeleteQuestionById,
};
