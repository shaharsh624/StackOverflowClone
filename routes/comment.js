const express = require("express");
const router = express.Router();
const {
    handleGetAllComments,
    handleCreateComment,
    handleUpdateCommentById,
    handleDeleteCommentById,
} = require("../controllers/comment");

router.get("/", handleGetAllComments);
router.post("/", handleCreateComment);
router.patch("/", handleUpdateCommentById);
router.delete("/:id", handleDeleteCommentById);

module.exports = router;
