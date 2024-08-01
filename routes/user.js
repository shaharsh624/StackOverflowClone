const express = require("express");
const { handleGetAllUsers, handleCreateUser, handleUpdateUserByUsername, handleGetUserByUsername } = require("../controllers/user");
const router = express.Router();

router.get("/", handleGetAllUsers);
router.post("/", handleCreateUser);
router.patch("/", handleUpdateUserByUsername);
router.get("/:username", handleGetUserByUsername);

module.exports = router;
