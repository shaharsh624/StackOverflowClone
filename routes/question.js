const express = require("express");
const router = express.Router();
const {
    handleGetAllQuestions,
    handleCreateQuestion,
    handleUpdateQuestionById,
    handleDeleteQuestionById
} = require("../controllers/question");

router.get("/", handleGetAllQuestions);
router.post("/", handleCreateQuestion);
router.patch("/", handleUpdateQuestionById);
router.delete("/:id", handleDeleteQuestionById);

module.exports = router;
