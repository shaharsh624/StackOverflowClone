const express = require("express");
const router = express.Router();
const {
    handleGetAllAnswers,
    handleCreateAnswer,
    handleUpdateAnswerById,
    handleDeleteAnswerById,
} = require("../controllers/answer");

router.get("/", handleGetAllAnswers);
router.post("/", handleCreateAnswer);
router.patch("/", handleUpdateAnswerById);
router.delete("/:id", handleDeleteAnswerById);

module.exports = router;
