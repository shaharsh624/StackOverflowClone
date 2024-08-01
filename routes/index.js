const express = require("express");
const router = express.Router();
const { handleUpdateVoteById, handleSearch, handleHelloWorld } = require("../controllers/");

router.get("/", handleHelloWorld);
router.patch("/vote", handleUpdateVoteById);
router.get("/search", handleSearch);

module.exports = router;
