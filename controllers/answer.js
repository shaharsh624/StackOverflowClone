const Answer = require("../models/answer");

async function handleGetAllAnswers(req, res) {
    const allAnswers = await Answer.find({});
    return res.json(allAnswers);
}

async function handleGetAnswerById(req, res) {
    await Answer.findOne(req.params.id).then((answer) => {
        return res.json(answer);
    });
}

async function handleCreateAnswer(req, res) {
    const body = req.body;
    if (!body.body) return res.status(400).json({ error: "body is required" });

    try {
        await Answer.create({
            body: body.body,
            questionId: body.questionId,
            userId: body.userId,
        });
        return res.status(201).json({ msg: "Answer Created" });
    } catch (error) {
        return res.json({ error: error });
    }
}

async function handleUpdateAnswerById(req, res) {
    const body = req.body;
    try {
        await Answer.findByIdAndUpdate(body.id, body);
        return res.status(201).json({ msg: "Answer Updated" });
    } catch (error) {
        return res.json({ error: error });
    }
}

async function handleDeleteAnswerById(req, res) {
    try {
        await Answer.findByIdAndDelete(req.params.id);
        return res.status(201).json({ msg: "Answer Deleted" });
    } catch (error) {
        return res.json({ error: error });
    }
}

module.exports = {
    handleGetAllAnswers,
    handleGetAnswerById,
    handleCreateAnswer,
    handleUpdateAnswerById,
    handleDeleteAnswerById,
};
