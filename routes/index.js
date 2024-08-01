const express = require("express");
const router = express.Router();
const { handleUpdateVoteById, handleSearch } = require("../controllers/");

router.patch("/vote", handleUpdateVoteById);
router.get("/search", handleSearch);

module.exports = router;
