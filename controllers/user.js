const User = require("../models/user");
const { createHmac, randomBytes } = require("node:crypto");

const generateHash = function (salt, password) {
    const hashedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    return hashedPassword;
};

async function handleGetAllUsers(req, res) {
    const allDBUser = await User.find({});
    return res.json(allDBUser);
}

async function handleGetUserByUsername(req, res) {
    const username = req.params.username;
    const user = await User.findOne({ username:username });
    return res.json(user);
}

async function handleCreateUser(req, res) {
    const body = req.body;
    if (!body.username)
        return res.status(400).json({ error: "username is required" });

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = generateHash(salt, body.password);

    try {
        await User.create({
            username: body.username,
            email: body.email,
            password: hashedPassword,
            salt: salt,
        });
        return res.status(201).json({ msg: "User Created" });
    } catch (error) {
        return res.json({ error: error });
    }
}

async function handleUpdateUserByUsername(req, res) {
    const body = req.body;
    const update = { ...body };
    if (!update.username) {
        return res.status(400).json({ error: "username is required" });
    }
    try {
        if (update.password) {
            await User.findOne({ username: update.username }).then((user) => {
                update.password = generateHash(user.salt, update.password);
            });
        }
        await User.findOneAndUpdate({ username: update.username }, update);
        return res.status(201).json({ msg: "User Updated" });
    } catch (error) {
        return res.json({ error: error });
    }
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleUpdateUserByUsername,
    handleGetUserByUsername,
};
